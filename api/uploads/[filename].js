import { getAdoptsCollection, getAnnouncementCollection } from "../../server/db/connection.js";
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { filename } = req.query;

  // Security check - validate filename
  if (!filename || /[\/\\]/.test(filename)) {
    return res.status(400).json({ message: "Invalid filename" });
  }

  try {
    // First check if file exists locally (for development)
    const localPath = path.join(process.cwd(), 'uploads', filename);

    if (fs.existsSync(localPath)) {
      // Local file found - serve it directly
      const fileBuffer = fs.readFileSync(localPath);

      // Set appropriate content type based on extension
      const ext = path.extname(filename).toLowerCase();
      const contentType =
        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
        ext === '.png' ? 'image/png' :
        ext === '.gif' ? 'image/gif' :
        ext === '.mp4' ? 'video/mp4' :
        'application/octet-stream';

      res.setHeader('Content-Type', contentType);
      return res.send(fileBuffer);
    }

    // If no local file, look for Base64 encoded file in MongoDB
    const collection = await getAdoptsCollection();
    const cat = await collection.findOne({ image: filename });

    if (cat && cat.imageData) {
      // Convert Base64 back to binary
      const buffer = Buffer.from(cat.imageData, 'base64');

      // Set content type
      const ext = path.extname(filename).toLowerCase();
      const contentType =
        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
        ext === '.png' ? 'image/png' :
        ext === '.gif' ? 'image/gif' :
        'application/octet-stream';

      res.setHeader('Content-Type', contentType);
      return res.send(buffer);
    }

    // If still not found, check announcements collection
    const announceCollection = await getAnnouncementCollection();
    const announcement = await announceCollection.findOne({ mediaUrl: filename });

    if (announcement && announcement.imageData) {
      // Convert Base64 back to binary
      const buffer = Buffer.from(announcement.imageData, 'base64');

      // Set content type
      const ext = path.extname(filename).toLowerCase();
      const contentType =
        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
        ext === '.png' ? 'image/png' :
        ext === '.gif' ? 'image/gif' :
        'application/octet-stream';

      res.setHeader('Content-Type', contentType);
      return res.send(buffer);
    }

    // File not found in any location
    return res.status(404).json({ message: "File not found" });
  } catch (error) {
    console.error("Error serving file:", error);
    return res.status(500).json({ message: "Error serving file" });
  }
}