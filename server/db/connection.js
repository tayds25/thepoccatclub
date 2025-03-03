import { MongoClient, ServerApiVersion } from "mongodb";
import path from "path";


const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("sol").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
    console.error(err);
}

// Create connections to databases
const adoptsDb = client.db("adopt");
const usersDb = client.db("users");

// Export all databases
export { usersDb, adoptsDb };