import { connectDB } from "../../../../util/database";
import { findContentByUUID, Block } from "../../../../util/findContentByUUID";
import CircularTimer from "../../../components/CircularTimer";

export default async function DetailPage({ params }: { params: { id: string } }) {
  try {
    const uuid = params.id;

    if (!uuid) {
      throw new Error('Invalid UUID');
    }

    console.log('Searching for UUID:', uuid);

    const client = await connectDB;
    const db = client.db("pbs");

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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Detail Page</h1>
        <p className="mb-8">{content}</p>
        <CircularTimer />
      </div>
    );
  } catch (error) {
    console.error('Error in DetailPage:', error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}