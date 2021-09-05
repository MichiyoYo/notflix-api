const express = require("express"),
  morgan = require("morgan");

const server = express();
server.use(express.json());
server.use(morgan("common"));

const PORT = 8080;

let topMovies = [
  {
    title: "Back to the future",
    year: 1985,
    genre: "sci-fi",
  },
  {
    title: "Terminator 2: Judgement Day",
    year: 1991,
    genre: "sci-fi",
  },
  {
    title: "The Big Lebowsky",
    year: 1998,
    genre: "comedy",
  },
  {
    title: "Being John Malkovitch",
    year: 1999,
    genre: "drama",
  },
  {
    title: "Batman",
    year: 1989,
    genre: "super-heroes",
  },
  {
    title: "Inception",
    year: 2010,
    genre: "sci-fi",
  },
  {
    title: "Reservoir Dogs",
    year: 1992,
    genre: "cult",
  },
  {
    title: "The Crow",
    year: 1994,
    genre: "drama",
  },
  {
    title: "Jurassic Park",
    year: 1993,
    genre: "action",
  },
  {
    title: "Indiana Jones - Raiders of the Lost Ark",
    year: 1981,
    genre: "adventure",
  },
];

server.use("/docs", express.static("public/docs"));

server.get("/", (req, res) => {
  let responseText =
    "<h1>Welcome to NotFlix! 🍿</h1><h2>Not your mother's movie DB.</h2>";
  res.status(200).send(responseText);
});

server.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong 😿");
});

server.listen(PORT, () => {
  console.log("Server running on port 8080 🤙 ");
});
