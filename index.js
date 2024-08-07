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

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const reviewCollection = client.db("tutorRev").collection("reviews");

    app.get("/services", async (req, res) => {
      const services = await serviceCollection.find({}).toArray();
      res.send(services);
    });
    app.get("/homeServices", async (req, res) => {
      const services = await serviceCollection.find({}).limit(3).toArray();
      res.send(services);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const data = await serviceCollection.findOne(query);
      res.send(data);
    });

    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
      console.log(review);
    });

    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { sub_id: id };
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });
    app.get("/userReviews/:uid", async (req, res) => {
      const user_id = req.params.uid;
      console.log(user_id);
      const query = { user_uid: user_id };
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
      console.log("reviews: ", reviews);
    });

    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    app.patch("/review/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.params.status;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { review: status },
      };
      const result = await reviewCollection.updateOne(query, updatedDoc, {
        upsert: true,
      });
      res.send(result);
    });

    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log("running ...");
});
