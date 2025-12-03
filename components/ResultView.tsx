import React, { useState } from 'react';
import { Button } from './Button';

interface ResultViewProps {
  script: string;
  topic: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ script, topic, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">생성된 대본</h2>
          <p className="text-slate-400 mt-1">주제: <span className="text-indigo-400">{topic}</span></p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onReset}>
            새로 만들기
          </Button>
          <Button onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-500" : ""}>
            {copied ? "복사 완료!" : "대본 복사하기"}
          </Button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <pre className="whitespace-pre-wrap font-sans text-lg leading-8 text-slate-200 min-h-[400px]">
          {script}
        </pre>
      </div>
      
      <div className="bg-indigo-900/30 p-4 rounded-xl border border-indigo-500/30 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <p className="text-indigo-200 text-sm leading-relaxed mt-1">
          이 대본은 AI가 기존 스타일을 분석하여 생성했습니다. 
          실제 촬영 시에는 본인의 말투에 맞게 조금 더 자연스럽게 수정해서 사용하는 것을 추천합니다.
        </p>
      </div>
    </div>
  );
};