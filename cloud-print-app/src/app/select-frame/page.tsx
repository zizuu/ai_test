"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '@/context/AppContext';

export default function SelectFramePage() {
  const { image, frameId, setFrameId } = useAppContext();
  const [selectedFrame, setSelectedFrame] = useState<string | null>(frameId);
  const [frames, setFrames] = useState<any[]>([]); // State to store frames
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!image) {
      router.replace('/select-file');
    }

    const fetchFrames = async () => {
      try {
        const response = await fetch('/api/frames');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFrames(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, [image, router]);

  const handleSelectFrame = (id: string) => {
    setSelectedFrame(id);
    setFrameId(id);
  };

  if (!image) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
            <p>画像が選択されていません。リダイレクト中...</p>
        </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
        <p>フレームを読み込み中...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
        <p className="text-red-400">エラー: {error}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
      <div className="w-full max-w-4xl rounded-2xl bg-gray-800 shadow-2xl shadow-blue-500/20">
        <div className="p-8 md:p-12">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-blue-400">
            フレームを選択
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Preview Area */}
            <div className="flex items-center justify-center rounded-lg bg-gray-700/50 p-2 relative aspect-video">
                <div className="relative w-full h-full">
                    <Image src={image} alt="User upload preview" layout="fill" objectFit="contain" />
                    {selectedFrame && (() => {
                        const frame = frames.find(f => f.id === selectedFrame);
                        if (!frame) return null;
                        if (frame.type === 'color') {
                            return <div className="absolute inset-0 pointer-events-none border-[25px]" style={{ borderColor: frame.value }}></div>;
                        }
                        if (frame.type === 'image') {
                            return <div className="absolute inset-0 pointer-events-none" style={{ borderImage: `url(${frame.value}) 100 round`, borderWidth: '25px', borderStyle: 'solid' }}></div>;
                        }
                        return null;
                    })()}
                </div>
            </div>

            {/* Frame Selection Area */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-gray-300">フレーム一覧</h2>
              <div className="grid grid-cols-3 gap-4">
                {frames.map((frame) => (
                  <button 
                    key={frame.id} 
                    onClick={() => handleSelectFrame(frame.id)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${selectedFrame === frame.id ? 'ring-4 ring-blue-500' : 'ring-2 ring-gray-600 hover:ring-blue-500'}`}>
                    {frame.type === 'color' ? (
                      <div className="w-full h-full" style={{backgroundColor: frame.value}}></div>
                    ) : (
                      <Image src={frame.value} alt={frame.name} layout="fill" objectFit="cover" />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold mix-blend-difference">{frame.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-b-2xl border-t border-gray-700 bg-gray-800 px-8 py-6 flex justify-between">
          <button
            onClick={() => router.push('/select-file')}
            className="rounded-lg px-6 py-2 text-base font-semibold transition-colors duration-300 bg-gray-600 text-white hover:bg-gray-500"
          >
            戻る
          </button>
          <button
            onClick={() => router.push('/preview')}
            disabled={!selectedFrame}
            className={`rounded-lg px-4 py-2 text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              selectedFrame
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500"
                : "cursor-not-allowed bg-gray-600 text-gray-400"
            }`}
          >
            <span>次へ進む</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
