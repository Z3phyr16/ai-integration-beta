import { ai } from "../config/gemini.js";

export const askGemini = async (conversationHistory: string) => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: conversationHistory,
  });

  return interaction.output_text;
};
