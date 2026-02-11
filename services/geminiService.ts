import { GoogleGenAI } from "@google/genai";
import { InterpretationResult } from "../types";

/**
 * ИНСТРУКЦИЯ ДЛЯ РАБОТЫ В РФ:
 * 1. Вы создали прокси на Railway и получили ссылку.
 * 2. Вставьте её ниже в PROXY_BASE_URL.
 * 
 * ВАЖНО: Ссылка должна быть БЕЗ слеша на конце.
 */
// Пример: const PROXY_BASE_URL = "https://dream-proxy-production.up.railway.app";
const PROXY_BASE_URL = "https://spin-mujik.up.railway.app"; // Сюда вставьте вашу ссылку из Railway

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const interpretDream = async (dreamText: string): Promise<InterpretationResult> => {
  // 1. Пытаемся работать через прокси (БЕЗ ВПН)
  if (PROXY_BASE_URL) {
    try {
      console.log("Using proxy for interpretation...");
      const response = await fetch(`${PROXY_BASE_URL}/interpret`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamText })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Proxy error");
      }
      
      return await response.json();
    } catch (e: any) {
      console.error("Proxy Interpretation Failed:", e);
      // Если прокси не настроен или упал, и мы в РФ - кидаем ошибку региона
      throw new Error("REGION_BLOCKED");
    }
  }

  // 2. Если прокси нет — работаем напрямую (НУЖЕН ВПН)
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Проанализируй сон: "${dreamText}"`,
      config: {
        systemInstruction: "Ты мистический психоаналитик. Твоя задача — расшифровать сон, используя психологические архетипы Юнга. Предложи поэтичное название (title), глубокое толкование (interpretation), жизненный совет (advice) и 3 коротких тега (tags). Определи настроение сна (mood) из списка: mystical, dark, bright, neutral. Ответ должен быть строго в формате JSON.",
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text) as InterpretationResult;
  } catch (error: any) {
    console.error("Direct API call failed:", error);
    if (error.message?.includes('403') || error.message?.includes('PERMISSION_DENIED') || error.message?.includes('fetch')) {
      throw new Error("REGION_BLOCKED");
    }
    throw error;
  }
};

export const generateDreamImage = async (dreamDescription: string, mood: string = 'mystical'): Promise<string> => {
  const fallbackImage = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop";
  const prompt = `A mystical surrealist digital art representing this dream: ${dreamDescription}. Style: ${mood}. Highly detailed, 4k. Circular composition. No text.`;

  // Работа через прокси (БЕЗ ВПН)
  if (PROXY_BASE_URL) {
    try {
      console.log("Using proxy for image generation...");
      const response = await fetch(`${PROXY_BASE_URL}/generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) throw new Error("Proxy image error");
      
      const data = await response.json();
      return `data:image/png;base64,${data.image}`;
    } catch (e) {
      console.error("Proxy Image Generation Failed:", e);
      return fallbackImage;
    }
  }

  // Напрямую (НУЖЕН ВПН)
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (part?.inlineData?.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    return fallbackImage;
  } catch (error) {
    return fallbackImage;
  }
};
