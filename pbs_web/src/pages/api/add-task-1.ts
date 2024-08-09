import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { UUID } from "mongodb";

export default async function handler(
  요청: NextApiRequest,
  응답: NextApiResponse
) {
  if (요청.method === "POST") {
    try {
      const client = await connectDB;
      const db = client.db("pbs");
      const collection = db.collection("block");
      console.log(요청.body);
      const { firstGroup, secondGroup } = 요청.body;

      const 새문서 = {
        title: "",
        steps: [
          {
            id: new UUID(),
            type: "how",
            question_content: "먼저 필요한 것을 /n 파악하기 위해, {actionchip}",
            description: "문제를 해결하기 위해 무엇을 할 것인가?",
            action_chip: firstGroup.map((chip: any) => ({
              id: new UUID(),
              content: chip.content,
              description: "",
              is_completed: false,
              is_first_step: false,
              duration: [],
              notes: "",
              action_chip_depth: [],
            })),
          },
          {
            id: new UUID(),
            type: "how",
            question_content:
              "하고, /n 해결 방안을 찾기 위해 {actionchip} 할 것이다.",
            description: "해결 방안을 찾기 위해 분석합니다.",
            action_chip: secondGroup.map((chip: any) => ({
              id: new UUID(),
              content: chip.content,
              description: "",
              is_completed: false,
              is_first_step: false,
              duration: [],
              notes: "",
              action_chip_depth: [],
            })),
          },
        ],
      };

      const 결과 = await collection.insertOne(새문서);

      응답.status(200).json({
        message: `데이터가 성공적으로 저장되었습니다. 삽입된 ID: ${결과.insertedId}`,
        id: 결과.insertedId,
      });
    } catch (에러) {
      console.error("데이터베이스 오류:", 에러);
      응답.status(500).json({ 에러: "서버 오류가 발생했습니다." });
    }
  } else {
    응답.status(405).json({ 에러: "허용되지 않는 메소드입니다." });
  }
}
