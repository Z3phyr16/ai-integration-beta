import { ai } from "../config/gemini.js";
import { getGlobalRules } from "./rules.service.js";

export const askGemini = async (conversationHistory: string) => {
  const globalRules = await getGlobalRules();
  const prompt = `
          You are a helpful AI assistant.

          Global Instructions:
          ${globalRules}

          Conversation:
          ${conversationHistory}
        `;
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
  });

  return interaction.output_text;
};
