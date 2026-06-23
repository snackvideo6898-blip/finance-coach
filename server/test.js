const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://financeadmin:helloo2026@cluster0.v0zm8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected Successfully");
  } catch (err) {
    console.log("❌ Error:", err.message);
  }
}

run();