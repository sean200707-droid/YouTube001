import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const ANALYSIS_MODEL = "gemini-2.5-flash";
const GENERATION_MODEL = "gemini-2.5-flash";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    structure: {
      type: Type.STRING,
      description: "Detailed analysis of the script's structure (Intro, Body, Outro, transitions).",
    },
    tone: {
      type: Type.STRING,
      description: "The tone and manner of the script (e.g., humorous, serious, fast-paced).",
    },
    targetAudience: {
      type: Type.STRING,
      description: "Inferred target audience based on language and content.",
    },
    hookStrategy: {
      type: Type.STRING,
      description: "How the script grabs attention in the first few sentences.",
    },
    suggestedTopics: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5 creative and related topics that would fit this specific script style.",
    },
  },
  required: ["structure", "tone", "targetAudience", "hookStrategy", "suggestedTopics"],
};

export const analyzeScript = async (scriptText: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL,
      contents: `다음 유튜브 대본을 분석해줘. 이 대본의 구조, 톤, 타겟 시청자, 그리고 후킹 전략을 분석해. 
      그리고 이 스타일과 포맷을 그대로 적용할 수 있는 흥미로운 주제 5가지를 추천해줘.
      반드시 한국어로 출력해야 해.
      
      [대본 내용]:
      ${scriptText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error("대본 분석에 실패했습니다. 내용을 확인하고 다시 시도해주세요.");
  }
};

export const generateNewScript = async (
  topic: string,
  analysis: AnalysisResult
): Promise<string> => {
  try {
    const prompt = `
    당신은 전문 유튜브 대본 작가입니다.
    
    [목표]: '${topic}'이라는 주제로 새로운 유튜브 대본을 작성하세요.
    
    [필수 조건]: 
    다음 분석된 스타일을 철저히 따라야 합니다. 구조, 톤, 호흡을 복제하듯이 작성하세요.
    
    - 구조 스타일: ${analysis.structure}
    - 톤앤매너: ${analysis.tone}
    - 타겟 시청자: ${analysis.targetAudience}
    - 후킹 전략: ${analysis.hookStrategy}
    
    대본은 바로 촬영에 들어갈 수 있도록 구어체로 자연스럽게 작성해주세요.
    지문(행동 묘사)이 필요하다면 (괄호) 안에 넣어주세요.
    `;

    const response = await ai.models.generateContent({
      model: GENERATION_MODEL,
      contents: prompt,
    });

    return response.text || "대본 생성에 실패했습니다.";
  } catch (error) {
    console.error("Generation failed:", error);
    throw new Error("새 대본 작성에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
};