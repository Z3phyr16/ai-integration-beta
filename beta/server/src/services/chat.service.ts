import prisma from "../prisma/client.js";
import { MessageRole } from "@prisma/client";
import { askGemini } from "./ai.service.js";

export const createConversation = async (title?: string) => {
  return prisma.conversation.create({
    data: {
      title: title || "No Title",
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
  return prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
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
