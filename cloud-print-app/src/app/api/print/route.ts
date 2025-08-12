import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, frameId } = body;

    // Basic validation
    if (!image || !frameId) {
      return NextResponse.json({ message: 'Missing image or frameId' }, { status: 400 });
    }

    // Simulate printing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure
    const isSuccess = Math.random() > 0.2; // 80% chance of success

    if (isSuccess) {
      console.log('Printing successful for frame:', frameId);
      return NextResponse.json({ message: 'Print job created successfully' }, { status: 200 });
    } else {
      throw new Error('Simulated printer error');
    }

  } catch (error) {
    console.error('Printing failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
