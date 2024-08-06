
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(요청: NextApiRequest, 응답: NextApiResponse) {
    console.log("test");
    응답.status(200).json({ message: 'Hello from aaa.com API!' });
}
