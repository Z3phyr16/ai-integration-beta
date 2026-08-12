import type { Request, Response } from "express";
import * as chatService from "../services/chat.service.js";

export const createConversation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title } = req.body;

    const conversation = await chatService.createConversation(title);

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create conversation",
      error,
    });
  }
};

export const getConversations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const conversations = await chatService.getConversations();

    res.json(conversations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch conversations",
      error,
    });
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const conversationId = Number(req.params.conversationId);

    const messages = await chatService.getMessages(conversationId);

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error,
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const response = await chatService.sendMessage(
      Number(conversationId),
      content,
    );

    res.json({
      response,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
