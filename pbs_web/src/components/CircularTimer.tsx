'use client'

import React, { useState, useEffect, useRef } from 'react';

// 타이머의 가능한 상태를 정의하는 타입
type TimerState = 'idle' | 'running' | 'paused' | 'stopped';

// CircularProgress 컴포넌트의 props 타입 정의
interface CircularProgressProps {
  percentage: number;
  children: React.ReactNode;
}

// 원형 프로그레스 바를 렌더링하는 컴포넌트
const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, children }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {/* 배경 원: 항상 완전한 원 형태를 유지 */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#e6e6e6"
        strokeWidth="10"
      />
      {/* 진행 상태를 나타내는 원: strokeDashoffset을 조절하여 진행률 표시 */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="10"
        strokeDasharray={2 * Math.PI * 45} // 원의 전체 둘레
        strokeDashoffset={2 * Math.PI * 45 * (1 - percentage / 100)} // 진행률에 따라 조절
        transform="rotate(-90 50 50)" // 12시 방향부터 시작하도록 회전
      />
      {children} {/* 시간 표시 또는 입력 필드 */}
    </svg>
  );
};

// 메인 타이머 컴포넌트
const CircularTimer: React.FC = () => {
  // 상태 관리
  const [maxTime, setMaxTime] = useState<number>(900); // 최대 시간 (초 단위, 기본값 15분)
  const [timeLeft, setTimeLeft] = useState<number>(maxTime); // 남은 시간 (초 단위)
  const [timerState, setTimerState] = useState<TimerState>('idle'); // 타이머의 현재 상태
  const [isEditing, setIsEditing] = useState<boolean>(false); // 시간 편집 모드 여부
  const [inputValue, setInputValue] = useState<string>('15:00'); // 시간 입력 필드의 값
  const [fontSize, setFontSize] = useState<number>(16); // 동적으로 조절되는 폰트 크기

  // ref 관리
  const containerRef = useRef<HTMLDivElement>(null); // 타이머 컨테이너 요소 참조
  const intervalRef = useRef<number | null>(null); // setInterval 참조 저장용
  const inputRef = useRef<HTMLInputElement>(null); // 시간 입력 필드 참조

  // 컴포넌트 크기에 따른 폰트 크기 동적 조정
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const minDimension = Math.min(width, height);
        // 폰트 크기를 컨테이너 크기의 1/8로 설정, 최소 12px, 최대 32px
        setFontSize(Math.max(12, Math.min(minDimension / 8, 32)));
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 타이머 로직
  useEffect(() => {
    if (timerState === 'running' && timeLeft > 0) {
      // 1초마다 timeLeft 감소
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

    // 컴포넌트 언마운트 또는 의존성 변경 시 interval 정리
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timeLeft]);

  // 편집 모드 시 input에 자동 포커스
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // 타이머 제어 함수들
  const startTimer = (): void => setTimerState('running');
  const pauseTimer = (): void => setTimerState('paused');
  const stopTimer = (): void => {
    setTimeLeft(maxTime);
    setTimerState('stopped');
  };

  // 시간을 'MM:SS' 형식으로 포맷팅하는 함수
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 타이머 텍스트 클릭 핸들러: 편집 모드 전환
  const handleTimeClick = (): void => {
    if (timerState === 'idle' || timerState === 'stopped') {
      setIsEditing(true);
      setInputValue(formatTime(maxTime));
    }
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // 입력 완료 (포커스 아웃) 핸들러
  const handleInputBlur = (): void => {
    const [minutes, seconds] = inputValue.split(':').map(Number);
    if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
      const newMaxTime = minutes * 60 + seconds;
      setMaxTime(newMaxTime);
      setTimeLeft(newMaxTime);
    }
    setIsEditing(false);
  };

  // Enter 키 입력 핸들러
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  // 진행률 계산
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
            // 시간 표시 (클릭 가능)
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
            // 시간 입력 필드
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
      {/* 제어 버튼 */}
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