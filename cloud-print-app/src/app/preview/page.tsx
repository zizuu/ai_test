"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

type PrintStatus = 'idle' | 'printing' | 'success' | 'error';

export default function PreviewPage() {
  const { image, frameId, setImage, setFrameId } = useAppContext();
  const router = useRouter();
  const [status, setStatus] = useState<PrintStatus>('idle');
  const [frames, setFrames] = useState<any[]>([]); // State to store frames
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('PreviewPage: image =', image);
  console.log('PreviewPage: frameId =', frameId);

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
  }, [image, frameId, router]);

  useEffect(() => {
    if (!image) {
      router.replace('/select-file');
    } else if (!frameId) {
      router.replace('/select-frame');
    }
  }, [image, frameId, router]);

  const handlePrint = async () => {
    if (!image || !frameId) return;

    setStatus('printing');

    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            image: image.split(',')[1], // Send only base64 data
            frameId,
            eventId: "event_abc", // Mock data
            timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Printing failed');
      }

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleRestart = () => {
    setImage(null);
    setFrameId(null);
    router.push('/');
  }

  if (!image || !frameId) {
    return <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white"><p>リダイレクト中...</p></main>;
  }

  const selectedFrameData = frames.find(f => f.id === frameId);
  console.log('PreviewPage: selectedFrameData =', selectedFrameData);

  if (!selectedFrameData) {
      return <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white"><p className="text-red-400">選択されたフレームが見つかりません。</p></main>;
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
      <div className="w-full max-w-2xl rounded-2xl bg-gray-800 shadow-2xl shadow-blue-500/20">
        <div className="p-8 md:p-12">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-blue-400">
            最終プレビュー
          </h1>
          <div className="flex items-center justify-center rounded-lg bg-gray-700/50 p-2 relative aspect-video h-[400px]">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
                 style={{
                     borderColor: selectedFrameData.type === 'color' ? selectedFrameData.value : 'transparent',
                     borderWidth: selectedFrameData.type === 'color' ? '25px' : '0px', // Only apply border for color frames
                     borderStyle: selectedFrameData.type === 'color' ? 'solid' : 'none',
                 }}>
                {/* User's image behind frame */}
                <Image src={image} alt="Final preview" layout="fill" objectFit="contain" className="z-0" />
                {/* Frame image on top */}
                {selectedFrameData.type === 'image' && (
                    <Image src={selectedFrameData.value} alt={selectedFrameData.name} layout="fill" objectFit="contain" className="absolute inset-0 z-10" />
                )}
            </div>
          </div>
        </div>

        <div className="rounded-b-2xl border-t border-gray-700 bg-gray-800 px-8 py-6">
            {status === 'idle' && (
                <div className="flex justify-between">
                    <button onClick={() => router.push('/select-frame')} className="rounded-lg px-6 py-2 text-base font-semibold transition-colors duration-300 bg-gray-600 text-white hover:bg-gray-500">
                        戻る
                    </button>
                    <button onClick={handlePrint} className="rounded-lg px-8 py-2 text-base font-semibold transition-all duration-300 bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500">
                        印刷する
                    </button>
                </div>
            )}

            {status === 'printing' && (
                <div className="flex items-center justify-center space-x-3">
                    <ArrowPathIcon className="h-6 w-6 animate-spin" />
                    <p className="text-lg">印刷しています...</p>
                </div>
            )}

            {status === 'success' && (
                <div className="text-center space-y-4">
                    <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto" />
                    <p className="text-xl text-green-300">印刷が完了しました！</p>
                    <button onClick={handleRestart} className="rounded-lg px-8 py-3 text-base font-semibold transition-all duration-300 bg-gray-600 text-white hover:bg-gray-500">
                        最初からやり直す
                    </button>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center space-y-4">
                    <ExclamationCircleIcon className="h-12 w-12 text-red-400 mx-auto" />
                    <p className="text-xl text-red-300">印刷に失敗しました。</p>
                    <button onClick={handlePrint} className="rounded-lg px-8 py-3 text-base font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-500">
                        再試行する
                    </button>
                </div>
            )}
        </div>
      </div>
    </main>
  );
}
