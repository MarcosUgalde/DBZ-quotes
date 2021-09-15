const mongoose = require("mongoose");
const Quote = require("./models/quotes");

mongoose.connect("mongodb://localhost:27017/DBZquotes");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const seedQuotes = [
  {
    author: "Son Goku",
    quote: "Creía que eso de casarse tenía que ver con comida",
  },
  { author: "Vegeta", quote: "Me pregunto si los androides sentís terror" },
  {
    author: "Piccolo",
    quote:
      "No tiene sentido decirte una mentira que te consuele, así que te diré la verdad",
  },
];

Quote.insertMany(seedQuotes)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
