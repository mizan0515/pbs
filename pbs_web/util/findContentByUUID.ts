// util/findContentByUUID.ts
import { WithId, Document } from 'mongodb';
import { stringify } from 'querystring';

interface ActionChip {
  content: string;
  description: string;
  is_completed: boolean;
  is_first_step: boolean;
  duration: any[];
  notes: string;
  action_chip_depth: any[];
}

interface Step {
  type: string;
  question_content: string;
  description: string;
  action_chip: ActionChip[];
}

export interface Block extends WithId<Document> {
  title: string;
  steps: Step[];
}
// UUID를 표준 형식으로 변환하는 함수
function standardizeUUID(uuid: string): string {
  // 하이픈 제거 및 소문자로 변환
  return uuid.replace(/-/g, '').toLowerCase();
}

export function findContentByUUID(block: Block, targetUUID: string): string | null {
  console.log('Searching in block:', JSON.stringify(block, null, 2));
  
  // 검색할 UUID를 표준 형식으로 변환
  const standardizedTargetUUID = standardizeUUID(targetUUID);

  for (const step of block.steps) {
    if (step.action_chip && Array.isArray(step.action_chip)) {
      for (const chip of step.action_chip) {
        console.log('chip:', chip);
        console.log('chip.id:', chip.id);
        
        // UUID를 문자열로 변환하고 표준 형식으로 변환
        const chipUUID = standardizeUUID(chip.id.toString('hex'));
        console.log('chipUUID:', chipUUID);
        
        if (chipUUID === standardizedTargetUUID) {
          console.log('Found matching chip:', chip);
          return chip.content;
        }
        
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

  console.log('Content not found for UUID:', targetUUID);
  return null;
}