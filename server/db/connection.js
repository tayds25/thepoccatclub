import { MongoClient, ServerApiVersion } from "mongodb";

// Connection pooling - cached client and database connections
let cachedClient = null;
let cachedDbs = {
  users: null,
  adopt: null,
  announcement: null
};

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDbs.users && cachedDbs.adopt && cachedDbs.announcement) {
    return {
      client: cachedClient,
      usersDb: cachedDbs.users,
      adoptsDb: cachedDbs.adopt,
      announcementDb: cachedDbs.announcement
    };
  }

  // Get MongoDB connection string
  const URI = process.env.MONGODB_URI || process.env.ATLAS_URI || "";
  if (!URI) {
    throw new Error("Please define the MONGODB_URI or ATLAS_URI environment variable");
  }

  // Create client with connection pooling
  const client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10, // Adjust based on expected concurrent requests
    minPoolSize: 5,  // Keep some connections ready
    socketTimeoutMS: 30000, // Timeout after 30 seconds
    connectTimeoutMS: 30000 // Timeout during connection
  });

  try {
    await client.connect();

    // Initialize database connections
    const usersDb = client.db("users");
    const adoptsDb = client.db("adopt");
    const announcementDb = client.db("announcement");

    // Test connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB");

    // Cache connections
    cachedClient = client;
    cachedDbs.users = usersDb;
    cachedDbs.adopt = adoptsDb;
    cachedDbs.announcement = announcementDb;

    return {
      client: cachedClient,
      usersDb,
      adoptsDb,
      announcementDb
    };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Helper functions to retrieve specific collections
export async function getUsersCollection(collectionName = "users") {
  const { usersDb } = await connectToDatabase();
  return usersDb.collection(collectionName);
}

export async function getAdoptsCollection(collectionName = "cats") {
  const { adoptsDb } = await connectToDatabase();
  return adoptsDb.collection(collectionName);
}

export async function getAnnouncementCollection(collectionName = "announcements") {
  const { announcementDb } = await connectToDatabase();
  return announcementDb.collection(collectionName);
}