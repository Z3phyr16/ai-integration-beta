import { Router } from "express";
import * as chatController from "../controllers/chat.controller.js";
import upload from "../middleware/upload.middleware.js";

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
  upload.single("image"),
  chatController.sendMessage,
);

router.delete("/conversations/:id", chatController.deleteConvo);

export default router;
