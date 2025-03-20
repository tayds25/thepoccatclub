import { getAdoptsCollection } from "../../server/db/connection.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ObjectId } from "mongodb";

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
    // Handle GET - list all cats
    try {
      const collection = await getAdoptsCollection();
      const results = await collection.find({}).toArray();
      return res.status(200).json(results);
    } catch (err) {
      console.error("Error fetching cats:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  else if (req.method === 'POST') {
    // Handle file upload manually for serverless
    try {
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: "File upload error" });
        }

        const collection = await getAdoptsCollection();
        let filename = null;

        // Handle file storage differently on Vercel vs local
        if (req.file) {
          if (process.env.NODE_ENV === 'production') {
            // For Vercel: save file data as Base64 in MongoDB
            const base64Image = req.file.buffer.toString('base64');
            filename = `${Date.now()}_${req.file.originalname}`;
            // Store file info in the cat record
          } else {
            // For local: use filename from disk storage
            filename = req.file.filename;
          }
        }

        const newCat = {
          name: req.body.name,
          age: req.body.age,
          trait: req.body.trait,
          gender: req.body.gender || "Unknown",
          trained: req.body.trained === "true" || req.body.trained === true,
          neutered: req.body.neutered === "true" || req.body.neutered === true,
          dewormed: req.body.dewormed === "true" || req.body.dewormed === true,
          vaccinated: req.body.vaccinated === "true" || req.body.vaccinated === true,
          image: filename,
          ...(process.env.NODE_ENV === 'production' && req.file ?
            { imageData: req.file.buffer.toString('base64') } : {})
        };

        const result = await collection.insertOne(newCat);
        res.status(201).json(result);
      });
    } catch (err) {
      console.error("Error adding new cat:", err);
      return res.status(500).json({ message: "Error adding cat" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}