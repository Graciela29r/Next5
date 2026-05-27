import { put, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const filename = `${generateId()}-${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      filename: blob.pathname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { pathname } = await req.json();

    if (!pathname) {
      return NextResponse.json(
        { error: 'No pathname provided' },
        { status: 400 }
      );
    }

    await del(pathname);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
