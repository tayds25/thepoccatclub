import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { adoptsDb } from "../db/connection.js";
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

// Reference the `cats` collection in the `adopt` database
const collection = adoptsDb.collection("cats");

// Get all adoptable cats
router.get("/", async (req, res) => {
    try {
        let results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (err) {
        console.error("Error fetching cats:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Get a single cat record by ID
router.get("/:id", async (req, res) => {
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            return res.status(404).send("Cat not found");
        }
        res.status(200).send(result);
    } catch (err) {
        console.error("Error fetching cat record:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Add a new cat for adoption (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
    try {
        let newCat = {
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

        let result = await collection.insertOne(newCat);
        res.status(201).send(result);
    } catch (err) {
        console.error("Error adding new cat:", err);
        res.status(500).send("Error adding cat");
    }
});

// Update a cat record by ID (with image update)
router.patch("/:id", upload.single("image"), async (req, res) => {
    try {
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

        let result = await collection.updateOne(query, updates);

        if (result.matchedCount === 0) {
            return res.status(404).send("Cat not found");
        }
        res.status(200).send(result);
    } catch (err) {
        console.error("Error updating cat record:", err);
        res.status(500).send("Error updating cat");
    }
});

// Delete a cat record by ID
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        let result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(404).send("Cat not found");
        }
        res.status(200).send(result);
    } catch (err) {
        console.error("Error deleting cat record:", err);
        res.status(500).send("Error deleting cat");
    }
});

export default router;
