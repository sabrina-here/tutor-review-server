const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("tutor finder server side running");
});

// SQ71VHn1Mw1zcjQ1
// sabTutor

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sabTutor:SQ71VHn1Mw1zcjQ1@cluster0.jmebqdy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  console.log(err);
});

async function run() {
  try {
    const serviceCollection = client.db("tutorRev").collection("services");

    app.get("/services", async (req, res) => {
      const services = await serviceCollection.find({}).toArray();
      res.send(services);
    });
    app.get("/homeServices", async (req, res) => {
      const services = await serviceCollection.find({}).limit(3).toArray();
      res.send(services);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log("running ...");
});
