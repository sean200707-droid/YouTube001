export interface AnalysisResult {
  structure: string;
  tone: string;
  targetAudience: string;
  hookStrategy: string;
  suggestedTopics: string[];
}

export enum AppStep {
  INPUT = 1,
  ANALYSIS = 2,
  GENERATION = 3
}

export interface ScriptState {
  originalScript: string;
  analysis: AnalysisResult | null;
  selectedTopic: string | null;
  generatedScript: string | null;
  isLoading: boolean;
  error: string | null;
  step: AppStep;
}