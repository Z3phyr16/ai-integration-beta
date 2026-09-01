import { ai } from "../config/gemini.js";

export const createEmbedding = async (text: string): Promise<number[]> => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [text],
  });

  if (!response.embeddings?.length) {
    throw new Error("Failed to generate embeddings");
  }

  return response.embeddings[0]!.values!;
};
