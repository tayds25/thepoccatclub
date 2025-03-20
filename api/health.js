import { connectToDatabase } from "../server/db/connection.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Basic health check - server is running
  try {
    // Test database connection
    const connection = await connectToDatabase();

    res.status(200).json({
      status: 'Server is running',
      database: 'connected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      mongodbUri: process.env.MONGODB_URI ? 'configured' : 'not configured',
      atlasUri: process.env.ATLAS_URI ? 'configured' : 'not configured'
    });
  } catch (error) {
    res.status(500).json({
      status: 'Server is running',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}