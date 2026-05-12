export interface GroqModel {
  id: string;
  name: string;
  emoji: string;
  speedRating: number; // 1-3, higher = faster
  capabilityRating: number; // 1-3, higher = more capable
  description: string;
  contextWindow: string;
}

export const GROQ_MODELS: Record<string, GroqModel> = {
  "llama-3.3-70b-versatile": {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    emoji: "🦙",
    speedRating: 2,
    capabilityRating: 3,
    description: "Most capable and versatile. Best for complex tasks, coding, and detailed analysis.",
    contextWindow: "8K tokens",
  },
  "mixtral-8x7b-32768": {
    id: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B",
    emoji: "🎯",
    speedRating: 3,
    capabilityRating: 2,
    description: "Fast and efficient. Great balance of speed and quality for most tasks.",
    contextWindow: "32K tokens",
  },
  "gemma2-9b-it": {
    id: "gemma2-9b-it",
    name: "Gemma 2 9B",
    emoji: "✨",
    speedRating: 3,
    capabilityRating: 2,
    description: "Super fast and lightweight. Perfect for quick responses and real-time chat.",
    contextWindow: "8K tokens",
  },
};

export const MODEL_ORDER = [
  "llama-3.3-70b-versatile",
  "mixtral-8x7b-32768",
  "gemma2-9b-it",
];

/**
 * Get model display name with emoji
 */
export function getModelDisplay(modelId: string): string {
  const model = GROQ_MODELS[modelId];
  if (!model) return modelId;
  return `${model.emoji} ${model.name}`;
}

/**
 * Get model info
 */
export function getModelInfo(modelId: string): GroqModel | null {
  return GROQ_MODELS[modelId] || null;
}
