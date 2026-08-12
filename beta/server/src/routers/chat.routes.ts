import { Router } from "express";
import * as chatController from "../controllers/chat.controller.js";

const router = Router();

router.post("/conversations", chatController.createConversation);

router.get("/conversations", chatController.getConversations);

router.get(
  "/conversations/:conversationId/messages",
  chatController.getMessages,
);

router.post(
  "/conversations/:conversationId/messages",
  chatController.sendMessage,
);

export default router;
