import { getAnnouncementCollection } from "../../server/db/connection.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for serverless
let storage;
let upload;

if (process.env.NODE_ENV === 'production') {
  // For Vercel: use memory storage
  const memoryStorage = multer.memoryStorage();
  upload = multer({
    storage: memoryStorage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });
} else {
  // For local: use disk storage
  const uploadDir = "uploads/";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  upload = multer({ storage });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const collection = await getAnnouncementCollection();
      const announcements = await collection.find().toArray();
      return res.status(200).json(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  else if (req.method === 'POST') {
    try {
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: "File upload error" });
        }

        const { title, content } = req.body;
        let mediaUrl = null;

        // Handle file storage differently on Vercel vs local
        if (req.file) {
          if (process.env.NODE_ENV === 'production') {
            // For Vercel: save file data as Base64
            mediaUrl = `image_${Date.now()}${path.extname(req.file.originalname)}`;
          } else {
            // For local: use disk path
            mediaUrl = `uploads/${req.file.filename}`;
          }
        }

        const collection = await getAnnouncementCollection();
        const newAnnouncement = {
          title,
          content,
          mediaUrl,
          createdAt: new Date(),
          ...(req.file && process.env.NODE_ENV === 'production' ?
            { imageData: req.file.buffer.toString('base64') } : {})
        };

        const result = await collection.insertOne(newAnnouncement);
        res.status(201).json(result);
      });
    } catch (error) {
      console.error("Error adding announcement:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}