import { getAdoptsCollection } from "../../server/db/connection.js";
import { ObjectId } from "mongodb";
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
  const { id } = req.query;

  try {
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const collection = await getAdoptsCollection();
    const query = { _id: new ObjectId(id) };

    if (req.method === 'GET') {
      // Handle GET - get single cat
      const result = await collection.findOne(query);
      if (!result) {
        return res.status(404).json({ message: "Cat not found" });
      }
      return res.status(200).json(result);
    }
    else if (req.method === 'DELETE') {
      // Handle DELETE - delete cat
      const result = await collection.deleteOne(query);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Cat not found" });
      }
      return res.status(200).json({ message: "Cat deleted successfully" });
    }
    else if (req.method === 'PATCH') {
      // Handle PATCH - update cat with file upload
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: "File upload error" });
        }

        const updates = {
          $set: {
            name: req.body.name,
            age: req.body.age,
            trait: req.body.trait,
            gender: req.body.gender || "Unknown",
            trained: req.body.trained === "true" || req.body.trained === true,
            neutered: req.body.neutered === "true" || req.body.neutered === true,
            dewormed: req.body.dewormed === "true" || req.body.dewormed === true,
            vaccinated: req.body.vaccinated === "true" || req.body.vaccinated === true,
          }
        };

        if (req.file) {
          if (process.env.NODE_ENV === 'production') {
            // For Vercel: save file data as Base64 in MongoDB
            const filename = `${Date.now()}_${req.file.originalname}`;
            updates.$set.image = filename;
            updates.$set.imageData = req.file.buffer.toString('base64');
          } else {
            // For local: use filename from disk storage
            updates.$set.image = req.file.filename;
          }
        }

        const result = await collection.updateOne(query, updates);

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Cat not found" });
        }

        res.status(200).json({ message: "Cat updated successfully" });
      });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error(`Error in cat ${req.method} operation:`, err);
    return res.status(500).json({ message: "Internal server error" });
  }
}