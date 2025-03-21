import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getAdoptsCollection } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer storage for images
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// Route to serve uploaded images
router.get("/images/:filename", (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(process.cwd(), "uploads", filename);

    if (!fs.existsSync(imagePath)) {
        return res.status(404).send("Image not found");
    }

    res.sendFile(imagePath);
});

// Get all adoptable cats
router.get("/", async (req, res) => {
    try {
        const collection = await getAdoptsCollection();
        const results = await collection.find({}).toArray();
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching cats:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Get a single cat record by ID
router.get("/:id", async (req, res) => {
    try {
        const collection = await getAdoptsCollection();
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.findOne(query);

        if (!result) {
            return res.status(404).send("Cat not found");
        }
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching cat record:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Add a new cat for adoption (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const collection = await getAdoptsCollection();
        const newCat = {
            name: req.body.name,
            age: req.body.age,
            trait: req.body.trait,
            gender: req.body.gender || "Unknown",
            trained: req.body.trained === "true" || req.body.trained === true,
            neutered: req.body.neutered === "true" || req.body.neutered === true,
            dewormed: req.body.dewormed === "true" || req.body.dewormed === true,
            vaccinated: req.body.vaccinated === "true" || req.body.vaccinated === true,
            image: req.file ? req.file.filename : null, // Save image filename
        };

        const result = await collection.insertOne(newCat);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error adding new cat:", err);
        res.status(500).send("Error adding cat");
    }
});

// Update a cat record by ID (with image update)
router.patch("/:id", upload.single("image"), async (req, res) => {
    try {
        const collection = await getAdoptsCollection();
        const query = { _id: new ObjectId(req.params.id) };
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
            },
        };

        if (req.file) {
            updates.$set.image = req.file.filename;
        }

        const result = await collection.updateOne(query, updates);

        if (result.matchedCount === 0) {
            return res.status(404).send("Cat not found");
        }
        res.status(200).json(result);
    } catch (err) {
        console.error("Error updating cat record:", err);
        res.status(500).send("Error updating cat");
    }
});

// Delete a cat record by ID
router.delete("/:id", async (req, res) => {
    try {
        const collection = await getAdoptsCollection();
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(404).send("Cat not found");
        }
        res.status(200).json(result);
    } catch (err) {
        console.error("Error deleting cat record:", err);
        res.status(500).send("Error deleting cat");
    }
});

export default router;