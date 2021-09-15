const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Quote = require("./models/quotes");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/DBZquotes");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/quotes", async (req, res) => {
  const quotes = await Quote.find({});
  res.render("index", { quotes });
});

app.get("/quotes/:id", async (req, res) => {
  const { id } = req.params;
  const quote = await Quote.findById(id);
  res.render("show", { quote });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
