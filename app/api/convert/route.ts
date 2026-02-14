import { NextResponse } from 'next/server';
import { convertWithOllama } from '@/lib/ollama';

export async function POST(req: Request) {
    try {
        const { code, model } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Missing code' }, { status: 400 });
        }

        const convertedCode = await convertWithOllama(code, model || 'codellama');

        return NextResponse.json({
            success: true,
            code: convertedCode
        });
    } catch (error: any) {
        console.error('Conversion API error:', error);
        return NextResponse.json({
            error: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}
