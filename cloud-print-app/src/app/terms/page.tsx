import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg h-[calc(100vh-10rem)] overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">利用規約</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-blue-300 mb-2">第1条（本規約への同意）</h2>
            <p>本サービスの利用者（以下「ユーザー」といいます）は、本利用規約（以下「本規約」といいます）の全ての条項に同意した上で、本サービスを利用するものとします。本規約に同意しない場合、ユーザーは本サービスを利用することはできません。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-300 mb-2">第2条（サービス内容）</h2>
            <p>本サービスは、ユーザーが所有する画像をアップロードし、指定されたフレームと合成して印刷するためのプラットフォームを提供します。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-300 mb-2">第3条（禁止事項）</h2>
            <p>ユーザーは、公序良俗に反する画像、第三者の著作権や肖像権を侵害する画像、その他不適切な画像をアップロードしてはなりません。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-300 mb-2">第4条（免責事項）</h2>
            <p>本サービスの利用によって生じたいかなる損害についても、当方は一切の責任を負いません。</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
