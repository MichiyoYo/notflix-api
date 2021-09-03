const express = require("express"),
  morgan = require("morgan");

const app = express();

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
app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let responseText =
    "<h1>Welcome to NotFlix! 🍿</h1><h2>Not your mother's movie DB.</h2>";
  res.send(responseText);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong 😿");
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
