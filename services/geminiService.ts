import { InterpretationResult } from "../types";

const PROXY_BASE_URL = import.meta.env.VITE_PROXY_BASE_URL;

export const interpretDream = async (dreamText: string): Promise<InterpretationResult> => {
  if (!PROXY_BASE_URL) throw new Error("PROXY_NOT_CONFIGURED");

  const response = await fetch(`${PROXY_BASE_URL}/interpret`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dreamText })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Proxy error");
  }

  return await response.json();
};

export const generateDreamImage = async (dreamDescription: string, mood: string = "mystical"): Promise<string> => {
  const fallbackImage = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop";
  if (!PROXY_BASE_URL) return fallbackImage;

  const prompt = `A mystical surrealist digital art representing this dream: ${dreamDescription}. Style: ${mood}. Highly detailed, 4k. Circular composition. No text.`;

  try {
    const response = await fetch(`${PROXY_BASE_URL}/generate-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) return fallbackImage;
    const data = await response.json();
    return `data:image/png;base64,${data.image}`;
  } catch {
    return fallbackImage;
  }
};
