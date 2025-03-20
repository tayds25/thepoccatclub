import { connectToDatabase } from "../../server/db/connection.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test database connection
    const { client } = await connectToDatabase();
    await client.db("admin").command({ ping: 1 });

    res.status(200).json({
      status: 'Database connection successful',
      timestamp: new Date().toISOString(),
      dbType: 'MongoDB',
      usingUri: process.env.MONGODB_URI ? 'MONGODB_URI' : 'ATLAS_URI'
    });
  } catch (error) {
    console.error('Health check: Database connection failed', error);
    res.status(500).json({
      status: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}