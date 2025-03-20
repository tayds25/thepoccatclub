import { getUsersCollection } from "../../server/db/connection.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  // Only allow POST for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}