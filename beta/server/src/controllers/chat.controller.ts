import type { Request, Response } from "express";
import * as chatService from "../services/chat.service.js";
import * as visionService from "../services/vision.service.js";
import { mapControlsToComponents } from "../services/component-mapper.service.js";
import { generateRazor } from "../services/razor-generator.service.js";
import fs from "fs/promises";

export const createConversation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title } = req.body;

    const conversation = await chatService.createConversation(title);

    res.status(201).json({
      success: true,
      message: "Conversation has been created successfully",
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create conversation",
      data: error,
    });
  }
};

export const renameConvo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const conversationId = Number(req.params.conversationId);
    const conversation = await chatService.renameConversation(
      conversationId,
      title,
    );
    return res.status(200).json({
      success: true,
      message: "Conversation has been renamed successfully",
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
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

    const data = await chatService.getMessages(conversationId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error,
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const conversationId = Number(req.params.conversationId);
    const content = req.body.content;
    let imageAnalysis = "";
    if (req.file) {
      const buffer = await fs.readFile(req.file.path);

      const base64 = buffer.toString("base64");

      const extension = req.file.originalname.split(".").pop()?.toLowerCase();

      let mimeType = "image/png";

      switch (extension) {
        case "jpg":
        case "jpeg":
          mimeType = "image/jpeg";
          break;

        case "png":
          mimeType = "image/png";
          break;

        case "webp":
          mimeType = "image/webp";
          break;
      }

      const detected = await visionService.analyzeUiImage(base64, mimeType);

      const mapped = await mapControlsToComponents(detected);

      const razor = generateRazor(mapped);

      console.log("Detected:");
      console.log(JSON.stringify(detected, null, 2));

      console.log("Mapped:");
      console.log(JSON.stringify(mapped, null, 2));

      console.log("Razor:");
      console.log(razor);

      imageAnalysis = razor;
    }

    const response = await chatService.sendMessage(
      Number(conversationId),
      content,
      imageAnalysis,
      req.file?.filename || "",
    );
    res.json({
      content: response,
      contentType: imageAnalysis ? "razor" : "",
    });
  } catch (error: any) {
    const message = error?.message ?? "Unknown error";

    if (message.includes("429")) {
      return res.status(429).json({
        error: "Gemini rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      error: message,
    });
  }
};

export const deleteConvo = async (req: Request, res: Response) => {
  try {
    const conversationId = Number(req.params.id);

    const deleteResponse = await chatService.deleteConversation(conversationId);

    return res.status(200).json({
      success: true,
      message: "Conversation has been deleted successfully",
      data: deleteResponse,
    });
  } catch (error) {
    console.error("DELETE CONVERSATION ERROR", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
