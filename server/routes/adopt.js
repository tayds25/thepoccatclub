import express from "express";
import { adoptsDb } from "../db/connection.js";
import { ObjectId } from "mongodb";
import { upload, uploadToBlob, deleteFromBlob } from "../utils/blobStorage.js";

const router = express.Router();

// Reference the `cats` collection in the `adopt` database
const collection = adoptsDb.collection("cats");

// Get all adoptable cats
router.get("/", async (req, res) => {
    try {
        let results = await collection.find({}).toArray();
        res.status(200).json(results);
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
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching cat record:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Add a new cat for adoption (with Vercel Blob Storage)
router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Upload image to Vercel Blob if provided
        let imageData = { url: null, pathname: null };

        if (req.file) {
            imageData = await uploadToBlob(req.file, 'cats');
            if (!imageData.success) {
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }

        let newCat = {
            name: req.body.name,
            age: req.body.age,
            trait: req.body.trait,
            gender: req.body.gender || "Unknown",
            trained: req.body.trained === "true" || req.body.trained === true,
            neutered: req.body.neutered === "true" || req.body.neutered === true,
            dewormed: req.body.dewormed === "true" || req.body.dewormed === true,
            vaccinated: req.body.vaccinated === "true" || req.body.vaccinated === true,
            image: imageData.url,
            blobPathname: imageData.pathname,
        };

        let result = await collection.insertOne(newCat);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error adding new cat:", err);
        res.status(500).send("Error adding cat");
    }
});

// Update a cat record by ID (with Vercel Blob Storage)
router.patch("/:id", upload.single("image"), async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const existingCat = await collection.findOne(query);

        if (!existingCat) {
            return res.status(404).send("Cat not found");
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
            },
        };

        // If new image uploaded, update image path and delete old one if exists
        if (req.file) {
            const imageData = await uploadToBlob(req.file, 'cats');

            if (imageData.success) {
                updates.$set.image = imageData.url;
                updates.$set.blobPathname = imageData.pathname;

                // Delete old image from Blob Storage if it exists
                if (existingCat.blobPathname) {
                    await deleteFromBlob(existingCat.blobPathname);
                }
            }
        }

        let result = await collection.updateOne(query, updates);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error updating cat record:", err);
        res.status(500).send("Error updating cat");
    }
});

// Delete a cat record by ID
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const catToDelete = await collection.findOne(query);

        if (!catToDelete) {
            return res.status(404).send("Cat not found");
        }

        let result = await collection.deleteOne(query);

        if (catToDelete.blobPathname) {
            await deleteFromBlob(catToDelete.blobPathname);
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error deleting cat record:", err);
        res.status(500).send("Error deleting cat");
    }
});

export default router;