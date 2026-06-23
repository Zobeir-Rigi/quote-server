import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

const quotes = [
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  const quote = randomQuote();
  res.json(quote);
});
app.post("/", (req, res) => {
  console.log("POST request received"); 

  const bodyBytes = [];

  req.on("data", chunk => bodyBytes.push(...chunk));

  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);

    console.log(" Raw body:", bodyString); 

    let body;
    try {
      body = JSON.parse(bodyString);
    } catch (error) {
      console.error("Invalid JSON");
      res.status(400).send("Expected JSON.");
      return;
    }

    console.log("Parsed body:", body); 

    if (typeof body !== "object" || !body.quote || !body.author) {
      res.status(400).send("Missing quote or author");
      return;
    }

    if (
      typeof body.quote !== "string" ||
      typeof body.author !== "string" ||
      body.quote.trim() === "" ||
      body.author.trim() === ""
    ) {
      console.log("Empty values received");
      res.status(400).send("Quote and author must not be empty");
      return;
    }

    quotes.push({
      quote: body.quote,
      author: body.author,
    });

    console.log("Quote added:", body); 
    console.log("All quotes:", quotes); 

    res.send("ok");
  });
});
``

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});