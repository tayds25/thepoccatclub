import express from "express";
import { getUsersCollection } from "../db/connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
    try {
        // Get collection using connection pooling
        const collection = await getUsersCollection();
        const existingUser = await collection.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create new user with hashed password
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: false,
            createdAt: new Date()
        };

        const result = await collection.insertOne(newUser);

        // Return success but don't include password
        res.status(201).json({
            success: true,
            userId: result.insertedId,
            name: newUser.name,
            email: newUser.email
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        // Get collection using connection pooling
        const collection = await getUsersCollection();
        const user = await collection.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Return user data (excluding password)
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            success: true,
            user: userWithoutPassword
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during login" });
    }
});

// Update admin routes similarly
router.patch("/set-admin", async (req, res) => {
    try {
        const { email, adminSecret } = req.body;

        // Get admin secret from environment variables
        const adminSecretKey = process.env.ADMIN_SECRET;
        if (!adminSecretKey) {
            console.error("ADMIN_SECRET environment variable not set");
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Verify the admin secret matches
        if (adminSecret !== adminSecretKey) {
            return res.status(403).json({ message: "Invalid admin secret key" });
        }

        // Get collection using connection pooling
        const collection = await getUsersCollection();
        const result = await collection.updateOne(
            { email },
            { $set: { isAdmin: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        if (result.modifiedCount === 0) {
            return res.status(200).json({ message: "User is already an admin" });
        }

        res.status(200).json({ message: "User is now an admin" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating admin status" });
    }
});

router.patch("/remove-admin", async (req, res) => {
    try {
        const { email, adminSecret } = req.body;

        // Get admin secret from environment variables
        const adminSecretKey = process.env.ADMIN_SECRET;
        if (!adminSecretKey) {
            console.error("ADMIN_SECRET environment variable not set");
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Verify the admin secret matches
        if (adminSecret !== adminSecretKey) {
            return res.status(403).json({ message: "Invalid admin secret key" });
        }

        // Get collection using connection pooling
        const collection = await getUsersCollection();
        const result = await collection.updateOne(
            { email },
            { $set: { isAdmin: false } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Admin status removed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating admin status" });
    }
});

export default router;