'use client'

import React, { useState, useEffect, useRef } from 'react';

type TimerState = 'idle' | 'running' | 'paused' | 'stopped';

interface CircularProgressProps {
  percentage: number;
  children: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, children }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#e6e6e6"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="10"
        strokeDasharray={2 * Math.PI * 45}
        strokeDashoffset={2 * Math.PI * 45 * (1 - percentage / 100)}
        transform="rotate(-90 50 50)"
      />
      {children}
    </svg>
  );
};

const CircularTimer: React.FC = () => {
  const [maxTime, setMaxTime] = useState<number>(900); // 15 minutes in seconds
  const [timeLeft, setTimeLeft] = useState<number>(maxTime);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('15:00');
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(16);
  const intervalRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const minDimension = Math.min(width, height);
        setFontSize(Math.max(8, Math.min(minDimension / 12, 18)));
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (timerState === 'running' && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as number);
            setTimerState('stopped');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerState('stopped');
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timeLeft]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const startTimer = (): void => setTimerState('running');
  const pauseTimer = (): void => setTimerState('paused');
  const stopTimer = (): void => {
    setTimeLeft(maxTime);
    setTimerState('stopped');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimeClick = (): void => {
    if (timerState === 'idle' || timerState === 'stopped') {
      setIsEditing(true);
      setInputValue(formatTime(maxTime));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = (): void => {
    const [minutes, seconds] = inputValue.split(':').map(Number);
    if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
      const newMaxTime = minutes * 60 + seconds;
      setMaxTime(newMaxTime);
      setTimeLeft(newMaxTime);
    }
    setIsEditing(false);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const percentage = (timeLeft / maxTime) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '60vw', 
          height: '60vw', 
          maxWidth: '400px', 
          maxHeight: '400px', 
          minWidth: '200px', 
          minHeight: '200px',
          position: 'relative'
        }}
      >
        <CircularProgress percentage={percentage}>
          {!isEditing ? (
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={fontSize}
              fontWeight="bold"
              style={{ cursor: 'pointer' }}
              onClick={handleTimeClick}
            >
              {formatTime(timeLeft)}
            </text>
          ) : (
            <foreignObject x="25" y="40" width="50" height="20">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyPress={handleInputKeyPress}
                style={{
                  width: '100%',
                  height: '100%',
                  fontSize: `${fontSize}px`,
                  textAlign: 'center',
                  border: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  fontWeight: 'bold'
                }}
              />
            </foreignObject>
          )}
        </CircularProgress>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        {(timerState === 'idle' || timerState === 'stopped' || timerState === 'paused') && (
          <button onClick={startTimer} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem' }}>
            Play
          </button>
        )}
        {timerState === 'running' && (
          <button onClick={pauseTimer} style={{ padding: '0.5rem 1rem', backgroundColor: '#eab308', color: 'white', border: 'none', borderRadius: '0.25rem' }}>
            Pause
          </button>
        )}
        {(timerState === 'running' || timerState === 'paused') && (
          <button onClick={stopTimer} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem' }}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default CircularTimer;