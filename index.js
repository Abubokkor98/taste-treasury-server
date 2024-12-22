const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://assignment-11-7312b.web.app"], //replace with client address
    credentials: true,
  })
);
// cookie parser middleware
app.use(cookieParser());

// mongo db
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nvaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // starting from here
    const foodCollection = client.db("A11-DB").collection("foods");
    const orderCollection = client.db("A11-DB").collection("orders");

    // save a food in db
    app.post("/add-food", async (req, res) => {
      const newFood = req.body;
      const result = await foodCollection.insertOne(newFood);
      res.send(result);
    });
    // get all foods from db
    app.get("/foods", async (req, res) => {
      const result = await foodCollection.find().toArray();
      res.send(result);
    });
    // get a single food by id from db
    app.get("/food/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.findOne(query);
      res.send(result);
    });
    // get all foods posted by a specific user
    app.get("/foods/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "addedBy.email": email };
      const result = await foodCollection.find(query).toArray();
      res.send(result);
    });

    /********
     * orders db from here
     ********/
    // save a order in db
    app.post("/add-order", async (req, res) => {
      const newOrder = req.body;
      const result = await orderCollection.insertOne(newOrder);
      // 2. Increase bid count in jobs collection
      const filter = { _id: new ObjectId(newOrder.foodId) };
      const update = {
        $inc: { purchaseCount: 1 },
      };
      const updatePurchaseCount = await foodCollection.updateOne(
        filter,
        update
      );
      console.log(updatePurchaseCount);
      res.send(result);
    });
    // get all orders posted by a specific user
    app.get("/orders/:email", async (req, res) => {
      const email = req.params.email;
      const query = { buyerEmail: email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });
    // delete a order from db
    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
run();

app.get("/", (req, res) => {
  res.send("Hello from assignment-11 server");
});

app.listen(port, () => {
  console.log(`taste treasury server is running at port: ${port}`);
});
