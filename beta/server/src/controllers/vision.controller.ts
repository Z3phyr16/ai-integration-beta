import type { Request, Response } from "express";
import * as visionService from "../services/vision.service.js";
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

    const result = await visionService.analyzeUiImage(
      base64,
      req.file.mimetype,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
