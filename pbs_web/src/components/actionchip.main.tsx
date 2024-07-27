// 필요한 모듈들을 import합니다.
import React from 'react';
import dotenv from "dotenv";
import { connectDB } from "../../util/database";

// 환경 변수를 로드합니다.
dotenv.config();

// Content 인터페이스를 정의합니다.
// 이는 추출된 내용의 형식을 지정합니다.
interface Content {
  type: 'actionChip' | 'actionChipDepth'; // 리터럴 타입을 사용하여 type을 제한합니다.
  content: string;
}

/**
 * 주어진 문서에서 actionChip과 actionChipDepth의 내용을 추출합니다.
 * @param doc - 처리할 문서 객체
 * @returns Content 객체의 배열
 */
const extractContents = (doc: any): Content[] => {
  const contents: Content[] = [];

  // doc.steps가 존재하고 배열인지 확인합니다.
  if (doc.steps && Array.isArray(doc.steps)) {
    // 각 step을 순회합니다.
    doc.steps.forEach((step: any) => {
      // step.action_chip이 존재하고 배열인지 확인합니다.
      if (step.action_chip && Array.isArray(step.action_chip)) {
        // 각 action_chip을 순회합니다.
        step.action_chip.forEach((chip: any) => {
          // action_chip의 content가 존재하면 추가합니다.
          if (chip.content) {
            contents.push({ type: 'actionChip', content: chip.content });
          }
          // action_chip_depth가 존재하고 배열인지 확인합니다.
          if (chip.action_chip_depth && Array.isArray(chip.action_chip_depth)) {
            // 각 action_chip_depth를 순회합니다.
            chip.action_chip_depth.forEach((depth: any) => {
              // action_chip_depth의 content가 존재하면 추가합니다.
              if (depth.content) {
                contents.push({ type: 'actionChipDepth', content: depth.content });
              }
            });
          }
        });
      }
    });
  }

  return contents;
};

// React 컴포넌트를 정의합니다.
// 이 컴포넌트는 비동기 함수로, 데이터베이스에서 데이터를 가져와 처리합니다.
export default async function ActionChipMain() {
  // 데이터베이스 연결을 설정합니다.
  const client = await connectDB;
  const db = client.db("pbs");
  
  // 'block' 컬렉션의 모든 문서를 가져옵니다.
  let result = await db.collection("block").find().toArray();

  // 모든 문서에서 추출된 내용을 저장할 배열입니다.
  let allContents: Content[] = [];
  
  // 각 문서에 대해 extractContents 함수를 실행하고 결과를 allContents에 추가합니다.
  result.forEach(doc => {
    allContents = allContents.concat(extractContents(doc));
  });

  // 추출된 내용을 렌더링합니다.
  return (
    <div>
      {allContents.map((item, index) => (
        // 각 항목에 대해 div를 생성합니다. key prop은 React의 최적화를 위해 필요합니다.
        <div key={index}>
          <strong>{item.type}:</strong> {item.content}
        </div>
      ))}
    </div>
  );
}