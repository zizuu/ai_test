"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PhotoIcon, XCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '@/context/AppContext';

export default function SelectFilePage() {
  const { image, setImage } = useAppContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (image) {
      setImagePreview(image);
      setFileName('previously_selected.jpg'); // Placeholder filename
    }
  }, [image]);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('JPGまたはPNG形式の画像を選択してください。');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('画像サイズは10MB以下にしてください。');
      return;
    }

    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImage(result);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleFileChange(file || null);
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearImage = () => {
    setImagePreview(null);
    setFileName(null);
    setError(null);
    setImage(null);
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
      <div className="w-full max-w-2xl rounded-2xl bg-gray-800 shadow-2xl shadow-blue-500/20">
        <div className="p-8 md:p-12 mb-[50px]">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-blue-400">
            画像を選択
          </h1>
          
          {!imagePreview ? (
            <div 
              onDrop={onDrop} 
              onDragOver={onDragOver}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 text-center hover:border-blue-500 transition-colors duration-300 w-[200px] h-[200px] mx-auto"
            >
              <PhotoIcon className="h-8 w-8 text-gray-500" />
              <p className="mt-4 text-lg text-gray-400">ここにファイルをドラッグ＆ドロップ</p>
              <p className="text-sm text-gray-500">または</p>
              <label htmlFor="file-upload" className="mt-4 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                ファイルを選択
              </label>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg,image/png" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-[60vh] object-contain" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white flex justify-between items-center">
                <span className="text-sm truncate">{fileName}</span>
                <button onClick={clearImage} className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <XCircleIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-b-2xl border-t border-gray-700 bg-gray-800 px-8 py-6 flex justify-between">
          <button
            onClick={() => router.push('/')}
            className="rounded-lg px-6 py-2 text-base font-semibold transition-colors duration-300 bg-gray-600 text-white hover:bg-gray-500"
          >
            戻る
          </button>
          <button
            onClick={() => router.push('/select-frame')}
            disabled={!imagePreview}
            className={`rounded-lg px-4 py-2 text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              imagePreview
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
