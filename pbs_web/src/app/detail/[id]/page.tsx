import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "../../../../util/database";
import { findContentByUUID, Block } from "../../../../util/findContentByUUID";

export default async function DetailPage({ params }: { params: { id: string } }) {
  try {
    const uuid = params.id;

    if (!uuid) {
      throw new Error('Invalid UUID');
    }

    console.log('Searching for UUID:', uuid);

    const client = await connectDB;
    const db = client.db("pbs");

    // 'block' 컬렉션에서 모든 문서를 가져옵니다.
    let blocks = await db.collection("block").find().toArray() as Block[];

    console.log(`Found ${blocks.length} blocks`);

    let content: string | null = null;

    for (const block of blocks) {
      content = findContentByUUID(block, uuid);
      if (content) {
        console.log('Content found:', content);
        break;
      }
    }

    if (!content) {
      console.log('Content not found for UUID:', uuid);
      throw new Error('Content not found');
    }

    return (
      <div>
        <h1>Detail Page</h1>
        <p>{content}</p>
      </div>
    );
  } catch (error) {
    console.error('Error in DetailPage:', error);
    return (
      <div>
        <h1>Error</h1>
        <p>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}