import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { code, filename } = await req.json();

        if (!code || !filename) {
            return NextResponse.json({ error: 'Missing code or filename' }, { status: 400 });
        }

        const outputDir = path.join(process.cwd(), 'converted_tests');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, code);

        return NextResponse.json({ success: true, path: filePath });
    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
