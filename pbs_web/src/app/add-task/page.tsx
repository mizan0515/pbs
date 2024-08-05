"use client";

import React, { useState, useEffect } from "react";
import ActionChipChip from "@/components/actionchip.chip";
import "../global.css";
import "../add-task/add.page.css";

// ActionChip 인터페이스 정의: 각 칩의 구조를 설명
interface ActionChip {
  content: string;
  iconX: boolean;
}

// 임시 데이터
const mockHowListFirst: ActionChip[] = [
  { content: "📌 현상 명시", iconX: false },
  { content: "🔍 이상과 간극 식별", iconX: false },
  { content: "📚 배경 지식 검토", iconX: false },
  { content: "🔗 연관 요소 파악", iconX: false },
];

const mockHowListSecond: ActionChip[] = [
  { content: "🧐 유사 사례 찾기", iconX: false },
  { content: "🧩 문제 구조화", iconX: false },
  { content: "🔍 문제 구체화", iconX: false },
  { content: "⚖️ 사족, 잡음 제거", iconX: false },
  { content: "🎯 우선순위 설정", iconX: false },
  { content: "📅 실행 절차 수립", iconX: false },
  { content: "⏳ 일정 산정", iconX: false },
];

const AddPage: React.FC = () => {
  const [actionChipsFirst, setActionChipsFirst] = useState<ActionChip[]>([]);
  const [actionChipsSecond, setActionChipsSecond] = useState<ActionChip[]>([]);
  const [inputTextFirst, setInputTextFirst] = useState<string>("");
  const [inputTextSecond, setInputTextSecond] = useState<string>("");

  useEffect(() => {
    setActionChipsFirst(mockHowListFirst);
    setActionChipsSecond(mockHowListSecond);
  }, []);

  const handleChipClickFirst = (index: number) => {
    setActionChipsFirst((prevChips) =>
      prevChips.map((chip, i) =>
        i === index ? { ...chip, iconX: !chip.iconX } : chip
      )
    );
  };

  const handleChipClickSecond = (index: number) => {
    setActionChipsSecond((prevChips) =>
      prevChips.map((chip, i) =>
        i === index ? { ...chip, iconX: !chip.iconX } : chip
      )
    );
  };

  const getGroupedChips = () => {
    const firstGroupA = actionChipsFirst.filter((chip) => chip.iconX);
    const firstGroupB = actionChipsFirst.filter((chip) => !chip.iconX);
    const secondGroupA = actionChipsSecond.filter((chip) => chip.iconX);
    const secondGroupB = actionChipsSecond.filter((chip) => !chip.iconX);
    return { firstGroupA, firstGroupB, secondGroupA, secondGroupB };
  };

  const { firstGroupA, firstGroupB, secondGroupA, secondGroupB } =
    getGroupedChips();

  return (
    <div className="problemInputContainer">
      <div className="problemGuideInput">
        <div className="questionText">Add How List</div>
        <div className="chipAndLineContainer">
          <h2 className="text-xl font-semibold mb-2">First Group A</h2>
          <div className="chipsParent">
            {firstGroupA.map((chip, index) => (
              <ActionChipChip
                key={index}
                content={chip.content}
                iconX={chip.iconX}
                onClick={() =>
                  handleChipClickFirst(actionChipsFirst.indexOf(chip))
                }
              />
            ))}
          </div>
          <div className="line"></div>
          <div className="textInputContainer">
            <input
              type="text"
              value={inputTextFirst}
              onChange={(e) => setInputTextFirst(e.target.value)}
              className="textInput"
              placeholder="첫 번째 목록을 입력하세요"
            />
            <div className="inputTextLine"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2 mt-4">Second Group A</h2>
          <div className="chipsParent">
            {secondGroupA.map((chip, index) => (
              <ActionChipChip
                key={index}
                content={chip.content}
                iconX={chip.iconX}
                onClick={() =>
                  handleChipClickSecond(actionChipsSecond.indexOf(chip))
                }
              />
            ))}
          </div>
          <div className="line"></div>
          <div className="textInputContainer">
            <input
              type="text"
              value={inputTextSecond}
              onChange={(e) => setInputTextSecond(e.target.value)}
              className="textInput"
              placeholder="두 번째 목록을 입력하세요"
            />
            <div className="inputTextLine"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2 mt-4">First Group B</h2>
          <div className="chipsParent">
            {firstGroupB.map((chip, index) => (
              <ActionChipChip
                key={index}
                content={chip.content}
                iconX={chip.iconX}
                onClick={() =>
                  handleChipClickFirst(actionChipsFirst.indexOf(chip))
                }
              />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2 mt-4">Second Group B</h2>
          <div className="chipsParent">
            {secondGroupB.map((chip, index) => (
              <ActionChipChip
                key={index}
                content={chip.content}
                iconX={chip.iconX}
                onClick={() =>
                  handleChipClickSecond(actionChipsSecond.indexOf(chip))
                }
              />
            ))}
          </div>
        </div>
        <div className={"buttonParent"}>
          <button
            className="saveButton"
            onClick={async () => {
              try {
                const response = await fetch('/api/save-groups', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    firstGroup: actionChipsFirst,
                    secondGroup: actionChipsSecond,
                  }),
                });
                if (response.ok) {
                  alert('그룹이 성공적으로 저장되었습니다.');
                } else {
                  throw new Error('저장 실패');
                }
              } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
                alert('저장 중 오류가 발생했습니다.');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
