import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const framesDirectory = path.join(process.cwd(), 'public', 'frames');
  try {
    const fileNames = await fs.readdir(framesDirectory);
    const imageFiles = fileNames.filter(name => name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.gif') || name.endsWith('.webp'));
    
    const framesData = imageFiles.map(fileName => ({
      id: fileName.split('.')[0], // Use filename as ID
      name: fileName.split('.')[0], // Use filename as name
      type: 'image',
      value: `/frames/${fileName}`,
    }));

    return NextResponse.json(framesData);
  } catch (error) {
    console.error('Failed to read frames directory:', error);
    return NextResponse.json({ error: 'Failed to load frames' }, { status: 500 });
  }
}
