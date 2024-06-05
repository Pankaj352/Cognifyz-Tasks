const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// =========Middleware=========
app.use(cors());
app.use(bodyParser.json());

// ===========Connect to MongoDB============
mongoose
  .connect("mongodb://localhost:27017/cognifyz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection error!!", err);
  });

// =============User Schema & Model=============
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// ====== create a new user=========
app.post("/api", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: "Please fill all the fields" });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(200).json({
      result: { responseMsg: "User created successfully", newUser },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).send({ error: "Error creating user" });
  }
});

// ======== retrieve all users======
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      result: { responseMsg: "Users found successfully", users },
    });
  } catch (err) {
    console.error("Error retrieving users:", err);
    return res.status(500).send({ error: "Error retrieving users" });
  }
});

//update the user email
app.put("/api/update", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const users = await User.findOne({ email: email });
    if (!users) {
      return res.status(404).send({ error: "User not found" });
    } else {
      const updatedUser = await User.updateOne(
        { email: email },
        { $set: { name: req.body.name, new: true } }
      );
    }
    return res.status(200).json({
      result: { responseMsg: "Users name updated successfully!!!", users },
    });
  } catch (err) {
    console.error("Error retrieving users:", err);
    return res.status(500).send({ error: "Error retrieving users" });
  }
});

app.delete("/api/delete", async (req, res) => {
  try {
    const email = req.body.email;
    const users = await User.findOne({ email: email });
    if (!users) {
      return res.status(404).send({ error: "User not found" });
    } else {
      await User.deleteOne({ email: email });
      return res.status(200).json({
        result: { responseMsg: "User deleted successfully!!!" },
      });
    }
  } catch (err) {
    console.error("Error retrieving users:", err);
    return res.status(500).send({ error: "Error retrieving users" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
