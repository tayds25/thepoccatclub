import { getUsersCollection } from "../../server/db/connection.js";

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}