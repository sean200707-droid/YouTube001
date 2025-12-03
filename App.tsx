import React, { useState, useRef } from 'react';
import { AnalysisView } from './components/AnalysisView';
import { ResultView } from './components/ResultView';
import { Button } from './components/Button';
import { analyzeScript, generateNewScript } from './services/geminiService';
import { AppStep, ScriptState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<ScriptState>({
    originalScript: '',
    analysis: null,
    selectedTopic: null,
    generatedScript: null,
    isLoading: false,
    error: null,
    step: AppStep.INPUT,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({ ...prev, originalScript: e.target.value }));
  };

  const handleAnalyze = async () => {
    if (!state.originalScript.trim()) {
      setState(prev => ({ ...prev, error: "대본 내용을 입력해주세요." }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await analyzeScript(state.originalScript);
      setState(prev => ({
        ...prev,
        analysis: result,
        step: AppStep.ANALYSIS,
        isLoading: false
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || "분석 중 오류가 발생했습니다.",
        isLoading: false
      }));
    }
  };

  const handleTopicSelect = async (topic: string) => {
    if (!state.analysis) return;

    setState(prev => ({ ...prev, selectedTopic: topic, isLoading: true, error: null }));

    try {
      const script = await generateNewScript(topic, state.analysis);
      setState(prev => ({
        ...prev,
        generatedScript: script,
        step: AppStep.GENERATION,
        isLoading: false
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || "대본 생성 중 오류가 발생했습니다.",
        isLoading: false,
        selectedTopic: null // Reset topic selection on error
      }));
    }
  };

  const handleReset = () => {
    setState({
      originalScript: '',
      analysis: null,
      selectedTopic: null,
      generatedScript: null,
      isLoading: false,
      error: null,
      step: AppStep.INPUT,
    });
  };

  const handleSoftReset = () => {
    // Go back to topic selection, keep analysis
    setState(prev => ({
      ...prev,
      generatedScript: null,
      selectedTopic: null,
      step: AppStep.ANALYSIS,
      error: null
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full p-6 border-b border-gray-800 bg-gray-900/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20">
              🎬
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              YouTube <span className="text-indigo-400">Script Cloner</span>
            </h1>
          </div>
          <div className="text-sm text-gray-500 font-medium">
             AI-Powered Creator Tool
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-4 py-8 flex-1 flex flex-col items-center">
        
        {/* Error Message */}
        {state.error && (
          <div className="w-full max-w-4xl mb-6 bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-pulse">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p>{state.error}</p>
          </div>
        )}

        {/* Step 1: Input */}
        {state.step === AppStep.INPUT && (
          <div className="w-full max-w-4xl space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 pb-2">
                당신의 성공 공식을 복제하세요
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                기존에 반응이 좋았던 대본을 붙여넣으세요. <br className="hidden md:block"/>
                AI가 구조와 톤을 완벽하게 분석하여 새로운 대본을 만들어드립니다.
              </p>
            </div>

            <div className="bg-slate-800 p-1 rounded-2xl border border-slate-700 shadow-2xl">
              <textarea
                ref={textareaRef}
                className="w-full h-80 bg-slate-900 rounded-xl p-6 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg resize-none"
                placeholder="여기에 대본을 붙여넣으세요... (예: 오프닝 멘트부터 클로징까지)"
                value={state.originalScript}
                onChange={handleInputChange}
                spellCheck={false}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleAnalyze} 
                isLoading={state.isLoading}
                disabled={!state.originalScript.trim() || state.isLoading}
                className="w-full md:w-auto min-w-[200px] text-lg py-4"
              >
                대본 분석하고 주제 추천받기
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-slate-500">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <span className="block text-2xl mb-2">⚡️</span>
                구조 및 템포 분석
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <span className="block text-2xl mb-2">🎯</span>
                타겟 시청자 파악
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <span className="block text-2xl mb-2">📝</span>
                새로운 대본 생성
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Analysis & Selection */}
        {state.step === AppStep.ANALYSIS && state.analysis && (
          <AnalysisView 
            analysis={state.analysis}
            onSelectTopic={handleTopicSelect}
            onReset={handleReset}
            isLoading={state.isLoading}
          />
        )}

        {/* Step 3: Result */}
        {state.step === AppStep.GENERATION && state.generatedScript && state.selectedTopic && (
          <ResultView 
            script={state.generatedScript}
            topic={state.selectedTopic}
            onReset={handleSoftReset}
          />
        )}

        {state.isLoading && state.step !== AppStep.INPUT && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
             <div className="bg-slate-900 p-8 rounded-2xl border border-indigo-500/30 shadow-2xl text-center max-w-sm w-full">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {state.step === AppStep.INPUT ? "대본 분석 중..." : "대본 작성 중..."}
                </h3>
                <p className="text-slate-400">
                  {state.step === AppStep.INPUT 
                    ? "구조와 톤앤매너를 파악하고 있습니다." 
                    : "당신의 스타일로 글을 쓰고 있습니다."}
                </p>
             </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-slate-600 text-sm border-t border-slate-800">
        <p>© 2024 YouTube Script Cloner. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;