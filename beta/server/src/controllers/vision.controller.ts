import type { Request, Response } from "express";
import * as visionService from "../services/vision.service.js";
import { mapControlsToComponents } from "../services/component-mapper.service.js";
import { generateRazor } from "../services/razor-generator.service.js";
import fs from "fs/promises";

export const analyzeImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

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

    const mapped = mapControlsToComponents(detected);

    const razor = generateRazor(mapped);

    return res.json({
      success: true,
      razor,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
