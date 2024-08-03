"use client";

import React, { useState, useEffect } from 'react';
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
  { content: "💡 내부 자극", iconX: true },
  { content: "💡 외부 자극", iconX: false },
  { content: "💡 목표 설정", iconX: true },
];

const mockHowListSecond: ActionChip[] = [
  { content: "💡 시간 관리", iconX: false },
  { content: "💡 집중력 향상", iconX: true },
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
        setActionChipsFirst(prevChips => 
            prevChips.map((chip, i) => 
                i === index
                ? { ...chip, iconX: !chip.iconX }
                : chip
            )
        );
    };

    const handleChipClickSecond = (index: number) => {
        setActionChipsSecond(prevChips => 
            prevChips.map((chip, i) => 
                i === index
                ? { ...chip, iconX: !chip.iconX }
                : chip
            )
        );
    };

    const getGroupedChips = () => {
        const firstGroupA = actionChipsFirst.filter(chip => chip.iconX);
        const firstGroupB = actionChipsFirst.filter(chip => !chip.iconX);
        const secondGroupA = actionChipsSecond.filter(chip => chip.iconX);
        const secondGroupB = actionChipsSecond.filter(chip => !chip.iconX);
        return { firstGroupA, firstGroupB, secondGroupA, secondGroupB };
    };

    const { firstGroupA, firstGroupB, secondGroupA, secondGroupB } = getGroupedChips();

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
                        onClick={() => handleChipClickFirst(actionChipsFirst.indexOf(chip))} 
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
                        onClick={() => handleChipClickSecond(actionChipsSecond.indexOf(chip))} 
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
                        onClick={() => handleChipClickFirst(actionChipsFirst.indexOf(chip))} 
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
                        onClick={() => handleChipClickSecond(actionChipsSecond.indexOf(chip))} 
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPage;