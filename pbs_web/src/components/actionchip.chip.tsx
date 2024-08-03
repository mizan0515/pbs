"use client";
import React, { useState } from "react";

interface ActionChipProps {
  content: string;
  iconX: boolean;
  onClick: () => void;
}

export default function ActionChipChip({ content, iconX, onClick }: ActionChipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`chip ${isHovered ? 'hovered' : ''}`} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <span className="chipText">{content}</span>
      {iconX && <img className="chipXIcon" alt="" src="/x.svg" />}
    </div>
  );
}