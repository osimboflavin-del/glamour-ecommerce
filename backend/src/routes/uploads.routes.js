import { Router } from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /api/uploads  -> { url: "https://res.cloudinary.com/....jpg" }
router.post("/", requireAuth, requireAdmin, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No image received." });
    // Cloudinary returns full https URL
    res.status(201).json({ url: req.file.path });
  });
});

export default router;
