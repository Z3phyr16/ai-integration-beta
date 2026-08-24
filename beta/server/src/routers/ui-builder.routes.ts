import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/analyze", upload.single("image"), async (req, res) => {
  //   res.json({
  //     success: true,
  //     file: req.file,
  //   });
  return res.json({
    success: true,
    fileName: req.file?.filename,
    originalName: req.file?.originalname,
    path: req.file?.path,
  });
});

export default router;
