import express from "express";
import { getAnnouncementCollection } from "../db/connection.js";
import multer from "multer";
import path from "path";
import { ObjectId } from "mongodb";

const router = express.Router();

// Configure Multer for image and video storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mov", "video/avi"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create an announcement with an optional media file (image or video)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const mediaUrl = req.file ? `uploads/${req.file.filename}` : null;

    const collection = await getAnnouncementCollection();
    const newAnnouncement = { title, content, mediaUrl, createdAt: new Date() };

    const result = await collection.insertOne(newAnnouncement);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const collection = await getAnnouncementCollection();
    const announcements = await collection.find().toArray();
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    const collection = await getAnnouncementCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 1) {
      res.json({ message: "Announcement deleted" });
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;