"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleNextClick = () => {
    if (agreed) {
      router.push("/select-file");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
      <div className="w-full max-w-2xl rounded-2xl bg-gray-800 shadow-2xl shadow-blue-500/20">
        <div className="p-8 md:p-12">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-blue-400">
            利用規約
          </h1>
          <div className="h-64 overflow-y-auto rounded-lg bg-gray-700 p-6 text-sm text-gray-300 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
            <h2 className="mb-2 font-semibold text-white">第1条（本規約への同意）</h2>
            <p className="mb-4">
              本サービスの利用者（以下「ユーザー」といいます）は、本利用規約（以下「本規約」といいます）の全ての条項に同意した上で、本サービスを利用するものとします。本規約に同意しない場合、ユーザーは本サービスを利用することはできません。
            </p>
            <h2 className="mb-2 font-semibold text-white">第2条（サービス内容）</h2>
            <p className="mb-4">
              本サービスは、ユーザーが所有する画像をアップロードし、指定されたフレームと合成して印刷するためのプラットフォームを提供します。
            </p>
            <h2 className="mb-2 font-semibold text-white">第3条（禁止事項）</h2>
            <p className="mb-4">
              ユーザーは、公序良俗に反する画像、第三者の著作権や肖像権を侵害する画像、その他不適切な画像をアップロードしてはなりません。
            </p>
            <h2 className="mb-2 font-semibold text-white">第4条（免責事項）</h2>
            <p>
              本サービスの利用によって生じたいかなる損害についても、当方は一切の責任を負いません。
            </p>
          </div>
        </div>
        <div className="rounded-b-2xl border-t border-gray-700 bg-gray-800 px-8 py-6">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
              />
              <label htmlFor="agree" className="ml-3 text-base text-gray-300">
                利用規約に同意します
              </label>
            </div>
            <button
              onClick={handleNextClick}
              disabled={!agreed}
              className={`w-full rounded-lg px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                agreed
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500"
                  : "cursor-not-allowed bg-gray-600 text-gray-400"
              }`}
            >
              次へ進む
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}