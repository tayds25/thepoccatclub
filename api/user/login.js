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
}