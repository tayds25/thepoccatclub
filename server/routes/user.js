import express from "express";
import { usersDb } from "../db/connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
    try {
        // Check if user already exists
        let collection = await usersDb.collection("users");
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
        // Find user by email
        const collection = await usersDb.collection("users");
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

export default router;