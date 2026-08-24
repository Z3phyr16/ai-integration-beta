import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import * as visionController from "../controllers/vision.controller.js";

const router = Router();

router.post("/analyze", upload.single("image"), visionController.analyzeImage);

export default router;
