import React from "react";
import dotenv from "dotenv";
import { connectDB } from "../../util/database";
import styles from "./component.module.css";
import Link from "next/link";

dotenv.config();

// Content 인터페이스를 수정하여 step description을 별도의 타입으로 추가합니다.
interface Content {
  type: "actionChip" | "actionChipDepth" | "stepDescription";
  content: string;
  id: string;
}

/**
 * 주어진 문서에서 type이 'how'인 step의 actionChip, actionChipDepth 내용과 description을 추출합니다.
 * @param doc - 처리할 문서 객체
 * @returns Content 객체의 배열
 */
const extractContents = (doc: any): Content[] => {
  const contents: Content[] = [];

  // doc.steps가 존재하고 배열인지 확인합니다.
  if (doc.steps && Array.isArray(doc.steps)) {
    // 각 step을 순회합니다.
    doc.steps.forEach((step: any) => {
      // step의 type이 'how'인 경우에만 처리합니다.
      if (step.type === "how") {
        // step의 description을 별도의 항목으로 추가합니다.
        if (step.description) {
          contents.push({
            type: "stepDescription",
            content: step.description,
            id: step.id,
          });
        }

        // step.action_chip이 존재하고 배열인지 확인합니다.
        if (step.action_chip && Array.isArray(step.action_chip)) {
          // 각 action_chip을 순회합니다.
          step.action_chip.forEach((chip: any) => {
            // action_chip의 content가 존재하면 추가합니다.
            if (chip.content) {
              contents.push({
                type: "actionChip",
                content: chip.content,
                id: chip.id,
              });
            }
            // action_chip_depth가 존재하고 배열인지 확인합니다.
            if (
              chip.action_chip_depth &&
              Array.isArray(chip.action_chip_depth)
            ) {
              // 각 action_chip_depth를 순회합니다.
              chip.action_chip_depth.forEach((depth: any) => {
                // action_chip_depth의 content가 존재하면 추가합니다.
                if (depth.content) {
                  contents.push({
                    type: "actionChipDepth",
                    content: depth.content,
                    id: depth.id,
                  });
                }
              });
            }
          });
        }
      }
    });
  }

  return contents;
};

// React 컴포넌트를 정의합니다.
export default async function ActionChipMain() {
  const client = await connectDB;
  const db = client.db("pbs");

  // 'block' 컬렉션의 모든 문서를 가져옵니다.
  let dbResult = await db.collection("block").find().toArray();

  // 모든 문서에서 추출된 내용을 저장할 배열입니다.
  let allContents: Content[] = [];

  // 각 문서에 대해 extractContents 함수를 실행하고 결과를 allContents에 추가합니다.
  dbResult.forEach((doc) => {
    allContents = allContents.concat(extractContents(doc));
  });
  console.log(allContents);
  // 추출된 내용을 렌더링합니다.
  return (
    <div className={styles.actionChipContainer}>
      <div className={styles.parent}>
        {allContents.map((item, index) => {
          if (item.type === "stepDescription") {
            return (
              <div key={item.id} className={styles.stepDescription}>
                <div className={styles.title1}>
                  <div className="truncate">{item.content}</div>
                </div>
                <div className={styles.icon}>
                  <img className={styles.icon1} alt="" src="Icon-3.svg" />
                </div>
              </div>
            );
          } else if (
            item.type === "actionChip" ||
            item.type === "actionChipDepth"
          ) {
            return (
              <div key={item.id} className={styles.frameGroup}>
                {item.type === "actionChipDepth" && (
                  <div className={styles.vectorWrapper}>
                    <img
                      className={styles.frameChild}
                      alt=""
                      src="Vector-1.svg"
                    />
                  </div>
                )}
                <div className={styles.chevrondownWrapper}>
                  <div className={styles.checkbox} />
                </div>
                <Link
                  href={`/detail/${item.id}`}
                  className={styles.actionChipbox}
                >
                  <div className={styles.sample2}>
                    <div className="truncate">{item.content}</div>
                  </div>
                  <img
                    className={styles.chevrondownIcon}
                    alt=""
                    src="/icon-r.svg"
                  />
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
