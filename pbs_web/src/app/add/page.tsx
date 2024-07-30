"use client";

import React, { useState, useEffect } from 'react';
import ActionChipChip from "@/components/actionchip.chip";
import "../global.css";
import "./add.page.css";

// ActionChip 인터페이스 정의: 각 칩의 구조를 설명
interface ActionChip {
  content: string;
  iconX: boolean;
}
interface TextInput {
    inputText: string;
    setInputText: (inputText: string) => void;
}

// 임시 데이터
const mockHowList: ActionChip[] = [
  { content: "💡 내부 자극", iconX: true },
  { content: "💡 외부 자극", iconX: false },
  { content: "💡 목표 설정", iconX: true },
  { content: "💡 시간 관리", iconX: false },
  { content: "💡 집중력 향상", iconX: true },
];

const AddPage: React.FC = () => {
    // useState 훅을 사용하여 actionChips 상태와 이를 업데이트할 함수 생성
    // const [상태변수, 상태업데이트함수] = useState<상태타입>(초기값);
    const [actionChips, setActionChips] = useState<ActionChip[]>([]);
    // 위 코드에 대한 상세 설명:
    // 1. useState: React 훅으로, 함수형 컴포넌트에서 상태를 관리할 수 있게 해줍니다.
    // 2. <ActionChip[]>: 제네릭 타입으로, 이 상태가 ActionChip 객체의 배열임을 명시합니다.
    // 3. ([]): 초기값으로 빈 배열을 설정합니다.
    // 4. actionChips: 현재 상태값을 담는 변수입니다.
    // 5. setActionChips: 상태를 업데이트하는 함수입니다. 이 함수를 호출하면 React가 컴포넌트를 다시 렌더링합니다.


    useEffect(() => {
        console.log("useEffect");
        // 실제 API 호출로 대체 가능
        setActionChips(mockHowList);
    }, []);

    // handleChipClick 함수: 특정 인덱스의 칩을 클릭했을 때 호출되는 함수
    const handleChipClick = (index: number) => {
        // 클릭된 칩의 인덱스를 콘솔에 출력
        console.log("clicked", index);

        // setActionChips 함수를 사용하여 actionChips 상태를 업데이트
        setActionChips(prevChips => 
        // prevChips: 현재의 actionChips 상태
        // map 함수를 사용하여 각 칩을 순회하면서 새로운 배열 생성
            prevChips.map((chip, i) => 
                // 현재 순회 중인 칩의 인덱스(i)가 클릭된 칩의 인덱스(index)와 같다면
                i === index
                // 스프레드 연산자(...)를 사용하여 기존 칩의 속성을 복사하고,
                // iconX 값을 현재 값의 반대로 변경 (토글)
                ? { ...chip, iconX: !chip.iconX }
                // 클릭된 칩이 아니라면 그대로 유지
                : chip
                )
        );
    };


    // 칩을 그룹별로 분류하는 함수
    // 반환 타입을 명시적으로 지정
    const getGroupedChips = (): { groupA: ActionChip[], groupB: ActionChip[] } => {
        const groupA = actionChips.filter(chip => chip.iconX);
        const groupB = actionChips.filter(chip => !chip.iconX);
        return { groupA, groupB };
    };

    // 칩을 그룹별로 분류하고 그룹별로 렌더링
    // 구조 분해 할당
    const { groupA, groupB } = getGroupedChips();

    return (
        <div className= "problemInputContainer" >
            <div className="problemGuideInput">
                <div className="questionText">Add How List</div>
                    <div className="chipAndLineContainer">
                        <div className="chipsParent">
                        {groupA.map((chip, index) => (
                            <ActionChipChip 
                            key={index} 
                            content={chip.content} 
                            iconX={chip.iconX} 
                            onClick={() => handleChipClick(actionChips.indexOf(chip))} 
                            />
                        ))}
                        </div>
                        <div className="line"></div>
                        <div className="textInputContainer">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="textInput"
                                placeholder="Enter text here"
                            />
                            <div className="inputTextLine"></div>
                        </div>
                    </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Group B</h2>
                    <div className="chipsParent">
                    {groupB.map((chip, index) => (
                        <ActionChipChip 
                        key={index} 
                        content={chip.content} 
                        iconX={chip.iconX} 
                        onClick={() => handleChipClick(actionChips.indexOf(chip))} 
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPage;