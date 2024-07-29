"use client";
import React from "react";

interface ActionChipProps {
  content: string;
  iconX: boolean;
  onClick: () => void;
}

export default function ActionChipChip({ content, iconX, onClick }: ActionChipProps) {
  return (
    <div className="chip" onClick={onClick}>
      <span className="chipText">{content}</span>
      {iconX && <img className="chipXIcon" alt="" src="/x.svg" />}
    </div>
  );
}