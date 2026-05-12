export interface GroqModel {
  id: string;
  name: string;
  emoji: string;
  description: string;
  speedRating: number; // 1-3 stars
  capabilityRating: number; // 1-3 stars
  contextWindow: number;
}

export const GROQ_MODELS: Record<string, GroqModel> = {
  "llama-3.3-70b-versatile": {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    emoji: "🦙",
    description: "Most capable model. Best for complex tasks, reasoning, and detailed responses.",
    speedRating: 2,
    capabilityRating: 3,
    contextWindow: 8192,
  },
  "mixtral-8x7b-32768": {
    id: "mixtral-8x7b-32768",
    emoji: "🎯",
    name: "Mixtral 8x7B",
    description: "Balanced speed & capability. Great for general use and quick responses.",
    speedRating: 3,
    capabilityRating: 2,
    contextWindow: 32768,
  },
  "gemma2-9b-it": {
    id: "gemma2-9b-it",
    emoji: "✨",
    name: "Gemma 2 9B",
    description: "Fastest model. Best for real-time chat and quick interactions.",
    speedRating: 3,
    capabilityRating: 2,
    contextWindow: 8192,
  },
};

export const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export function getModelDisplay(modelId: string): string {
  const model = GROQ_MODELS[modelId];
  return model ? `${model.emoji} ${model.name}` : modelId;
}

export function getModelDescription(modelId: string): string {
  const model = GROQ_MODELS[modelId];
  return model?.description || "Unknown model";
}
