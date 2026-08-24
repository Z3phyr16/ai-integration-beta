import prisma from "../prisma/client.js";
import { MessageRole, type Conversation } from "@prisma/client";
import { askGemini } from "./ai.service.js";

export const createConversation = async (message?: string) => {
  const aiResponse = await askGemini(`
    Generate a short conversation title (3-6 words) based on this message.

    Rules:
    - Return ONLY the title
    - No quotes
    - No punctuation at the end
    - Maximum 6 words

    Message:
    ${message}
    `);

  return prisma.conversation.create({
    data: {
      title: aiResponse?.trim() || message || "No Title",
    },
  });
};

export const renameConversation = async (
  conversationId: number,
  title: string,
) => {
  return await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      title,
    },
  });
};

export const getConversations = async () => {
  return prisma.conversation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMessages = async (conversationId: number) => {
  const [conversation, messages] = await Promise.all([
    prisma.conversation.findUnique({
      where: { id: conversationId },
    }),
    prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    }),
  ]);
  return {
    conversation: conversation,
    messages,
  };
};

export const sendMessage = async (conversationId: number, content: string) => {
  await prisma.message.create({
    data: {
      conversationId,
      role: "USER",
      content,
    },
  });

  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const conversationHistory = messages
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");

  const aiResponse = await askGemini(conversationHistory);

  await prisma.message.create({
    data: {
      conversationId,
      role: "ASSISTANT",
      content: aiResponse || "",
    },
  });

  return aiResponse;
};

export const deleteConversation = async (id: number) => {
  const conversation = await prisma.conversation.findUnique({
    where: { id },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  await prisma.message.deleteMany({
    where: {
      conversationId: id,
    },
  });

  return prisma.conversation.delete({
    where: { id },
  });
};
