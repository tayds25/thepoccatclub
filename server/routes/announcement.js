import express from "express";
import { announcementDb } from "../db/connection.js";
import { ObjectId } from "mongodb";
import { upload, uploadToBlob, deleteFromBlob } from "../utils/blobStorage.js";

const router = express.Router();

// Create an announcement with an optional media file
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;

    // Upload image to Vercel Blob if provided
    let imageData = { url: null, pathname: null };

    if (req.file) {
      imageData = await uploadToBlob(req.file, 'announcements');
      if (!imageData.success) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    const announcementCollection = announcementDb.collection("announcements");
    const newAnnouncement = {
      title,
      content,
      imageUrl: imageData.url,
      blobPathname: imageData.pathname,
      createdAt: new Date()
    };

    const result = await announcementCollection.insertOne(newAnnouncement);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcementCollection = announcementDb.collection("announcements");
    const announcements = await announcementCollection.find().toArray();
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    const announcementCollection = announcementDb.collection("announcements");

    const announcement = await announcementCollection.findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    const result = await announcementCollection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 1) {
      if (announcement.blobPathname) {
        await deleteFromBlob(announcement.blobPathname);
      }
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