import React from 'react';
import { AnalysisResult } from '../types';
import { Button } from './Button';

interface AnalysisViewProps {
  analysis: AnalysisResult;
  onSelectTopic: (topic: string) => void;
  onReset: () => void;
  isLoading: boolean;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, onSelectTopic, onReset, isLoading }) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in space-y-8">
      
      {/* Analysis Summary Card */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
          <span className="mr-2">🔍</span> 대본 분석 결과
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">구조적 특징</h3>
            <p className="text-slate-100 leading-relaxed bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              {analysis.structure}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">톤앤매너</h3>
            <p className="text-slate-100 leading-relaxed bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              {analysis.tone}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">후킹 전략</h3>
            <p className="text-slate-100 leading-relaxed bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              {analysis.hookStrategy}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">타겟 시청자</h3>
            <p className="text-slate-100 leading-relaxed bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              {analysis.targetAudience}
            </p>
          </div>
        </div>
      </div>

      {/* Topic Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white mb-4">
          다음 영상을 위한 추천 주제
          <span className="text-sm font-normal text-slate-400 ml-2 block sm:inline mt-1 sm:mt-0">
             (하나를 선택하여 대본을 생성하세요)
          </span>
        </h2>
        
        <div className="grid gap-3">
          {analysis.suggestedTopics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTopic(topic)}
              disabled={isLoading}
              className="text-left w-full p-4 rounded-xl bg-slate-800 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="text-lg text-slate-200 group-hover:text-white font-medium">
                {idx + 1}. {topic}
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity">
                생성하기 →
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <Button variant="secondary" onClick={onReset} disabled={isLoading}>
          처음으로 돌아가기
        </Button>
      </div>
    </div>
  );
};