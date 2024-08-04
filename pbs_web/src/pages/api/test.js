import { NextResponse, NextRequest } from 'next/server';

export default function handler(요청 , 응답 ){
    console.log("test");
    응답.status(200).json({ message: 'Hello from aaa.com API!' });
}
/*
export default function GET(req: NextRequest) {
    console.log("test");
    return NextResponse.json({ message: "Hello, Next.js!" });  
}*/
