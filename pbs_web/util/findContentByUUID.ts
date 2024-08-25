// util/findContentByUUID.ts
import { WithId, Document } from 'mongodb';
import { stringify } from 'querystring';

// ActionChip 인터페이스 정의: 각 액션 칩의 구조를 설명합니다.
interface ActionChip {
  content: string;        // 칩의 내용
  description: string;    // 칩에 대한 설명
  is_completed: boolean;  // 완료 여부
  is_first_step: boolean; // 첫 번째 단계 여부
  duration: any[];        // 기간 정보 (구체적인 타입은 any로 설정됨)
  notes: string;          // 추가 노트
  action_chip_depth: any[]; // 하위 액션 칩 (구체적인 타입은 any로 설정됨)
}

// Step 인터페이스 정의: 각 단계의 구조를 설명합니다.
interface Step {
  type: string;           // 단계 유형
  question_content: string; // 질문 내용
  description: string;    // 단계 설명
  action_chip: ActionChip[]; // 액션 칩 배열
}

// Block 인터페이스 정의: 전체 블록의 구조를 설명합니다.
export interface Block extends WithId<Document> {
  title: string;          // 블록 제목
  steps: Step[];          // 단계 배열
}

// UUID를 표준 형식으로 변환하는 함수
function standardizeUUID(uuid: string): string {
  // 하이픈 제거 및 소문자로 변환
  return uuid.replace(/-/g, '').toLowerCase();
}

// UUID로 콘텐츠를 찾는 함수
export function findContentByUUID(block: Block, targetUUID: string): string | null {
  console.log('Searching in block:', JSON.stringify(block, null, 2));
  
  // 검색할 UUID를 표준 형식으로 변환
  const standardizedTargetUUID = standardizeUUID(targetUUID);

  // 블록의 모든 단계를 순회
  for (const step of block.steps) {
    if (step.action_chip && Array.isArray(step.action_chip)) {
      // 각 단계의 액션 칩을 순회
      for (const chip of step.action_chip) {
        console.log('chip:', chip);
        console.log('chip.id:', chip.id);
        
        // UUID를 문자열로 변환하고 표준 형식으로 변환
        const chipUUID = standardizeUUID(chip.id.toString('hex'));
        console.log('chipUUID:', chipUUID);
        
        // UUID가 일치하는 경우 콘텐츠 반환
        if (chipUUID === standardizedTargetUUID) {
          console.log('Found matching chip:', chip);
          return chip.content;
        }
        
        // 하위 액션 칩 검사
        if (chip.action_chip_depth && Array.isArray(chip.action_chip_depth)) {
          for (const depth of chip.action_chip_depth) {
            const depthUUID = standardizeUUID(depth.id.toString('hex'));
            if (depthUUID === standardizedTargetUUID) {
              console.log('Found matching depth chip:', depth);
              return depth.content;
            }
          }
        }
      }
    }
  }

  // 일치하는 UUID를 찾지 못한 경우
  console.log('Content not found for UUID:', targetUUID);
  return null;
}