const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserController = require("./controllers/User");
const BookController = require("./controllers/Book");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// you should not publish your mongo uri on GitHub but I've done it
// anyways for convinience.
// will delete it anyways

mongoose.connect(
  "mongodb+srv://crampete:crampete123@cluster0-jalxg.mongodb.net/library?retryWrites=true&w=majority",
  { useNewUrlParser: true, dbName: "library" }
);

app.use("/user", UserController);
app.use("/book", BookController);

app.listen(5000, () => {
  console.log("Server started");
});
