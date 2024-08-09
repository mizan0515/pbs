import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../util/database";

export default async function Detail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await connectDB;
    const db = client.db("pbs");

    // 'block' 컬렉션의 모든 문서를 가져옵니다.
    let dbResult = await db.collection("block").find().toArray();
    // id에 따라 데이터를 가져오는 로직을 추가합니다.
    console.log(req.query + "-------------------------------");
    console.log(dbResult);

    res.status(200).json(dbResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
