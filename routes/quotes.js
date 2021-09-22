const express = require("express");
const router = express.Router();
const Quote = require("../models/quotes");

router.get("/", async (req, res) => {
  const quotes = await Quote.find({});
  res.render("index", { quotes });
});

router.post("/", async (req, res) => {
  const newQuote = await new Quote(req.body);
  await newQuote.save();
  res.redirect("/quotes");
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const quote = await Quote.findById(id);
  res.render("show", { quote });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const quote = await Quote.findById(id);
  res.render("edit", { quote });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  await Quote.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect("/quotes");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Quote.findByIdAndDelete(id);
  res.redirect("/quotes");
});

module.exports = router;
