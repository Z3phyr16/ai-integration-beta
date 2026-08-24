import { Router } from "express";
import * as chatController from "../controllers/chat.controller.js";

const router = Router();

router.post("/conversations", chatController.createConversation);

router.patch("/conversations/:conversationId", chatController.renameConvo);

router.get("/conversations", chatController.getConversations);

router.get(
  "/conversations/:conversationId/messages",
  chatController.getMessages,
);

router.post(
  "/conversations/:conversationId/messages",
  chatController.sendMessage,
);

router.delete("/conversations/:id", chatController.deleteConvo);

export default router;
