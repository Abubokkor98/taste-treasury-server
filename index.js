const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://assignment-11-7312b.web.app"],
  credentials: true,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
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

// verifyToken
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access" });
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
  });

  next();
};

async function run() {
  try {
    // starting from here
    const foodCollection = client.db("A11-DB").collection("foods");
    const orderCollection = client.db("A11-DB").collection("orders");

    // generate jwt
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      // create token
      const token = jwt.sign(email, process.env.SECRET_KEY, {
        expiresIn: "5h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // logout || clear cookie from browser
    app.get("/logout", async (req, res) => {
      res
        .clearCookie("token", {
          maxAge: 0,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // save a food in db
    app.post("/add-food", async (req, res) => {
      const newFood = req.body;
      const result = await foodCollection.insertOne(newFood);
      res.send(result);
    });

    // get all foods from db
    app.get("/foods", async (req, res) => {
      const search = req.query.search;
      console.log(search);
      let query = {
        foodName: {
          $regex: search,
          $options: "i",
        },
      };
      const result = await foodCollection.find(query).toArray();
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
    app.get("/foods/:email", verifyToken, async (req, res) => {
      const decodedEmail = req.user?.email;
      const email = req.params.email;
      // verify user
      if (decodedEmail !== email)
        return res.status(401).send({ message: "unauthorized access" });

      const query = { "addedBy.email": email };
      const result = await foodCollection.find(query).toArray();
      res.send(result);
    });

    // update a food
    app.put("/food/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedFood = req.body;
      const food = {
        $set: {
          foodName: updatedFood.foodName,
          foodImage: updatedFood.foodImage,
          foodCategory: updatedFood.foodCategory,
          quantity: updatedFood.quantity,
          price: updatedFood.price,
          "addedBy.email": updatedFood.addedBy.email,
          "addedBy.name": updatedFood.addedBy.name,
          foodOrigin: updatedFood.foodOrigin,
          description: updatedFood.description,
          purchaseCount: updatedFood.purchaseCount,
        },
      };
      const result = await foodCollection.updateOne(filter, food, options);
      res.send(result);
    });

    /********
     * orders db from here
     ********/
    // save a order in db
    app.post("/add-order", async (req, res) => {
      const newOrder = req.body;
      const result = await orderCollection.insertOne(newOrder);
      // 2. Increase purchase count in jobs collection
      const filter = { _id: new ObjectId(newOrder.foodId) };
      const update = {
        $inc: {
          purchaseCount: 1,
          // purchaseCount: newOrder.orderQuantity,
          // quantity: newOrder.orderQuantity,
        },
      };
      const updatePurchaseCount = await foodCollection.updateOne(
        filter,
        update
      );
      res.send(result);
    });
    // get all orders posted by a specific user
    app.get("/orders/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const decodedEmail = req.user?.email;
      // verify user
      if (decodedEmail !== email)
        return res.status(401).send({ message: "unauthorized access" });
      const query = { buyerEmail: email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });
    // delete a order from db
    app.delete("/order/:id", verifyToken, async (req, res) => {
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
