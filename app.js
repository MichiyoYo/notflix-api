/**
 * @fileOverview Server application where API endpoints are defined.
 * @author Cristina Lester
 * @version 1.0.0
 */

const express = require("express"),
  morgan = require("morgan"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models/models.js");
//const bodyParser = require("body-parser");

const server = express();
//not using body-parser because it's deprecated
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("common"));

const Movies = Models.Movie,
  Users = Models.User,
  Actors = Models.Actor,
  Directors = Models.Director,
  Genres = Models.Genre;

mongoose.connect("mongodb://localhost:27017/NotFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * The variable PORT holds the port number where the server is gonna be reacheable at
 * @type {number}
 * @constant
 */
const PORT = 8080;

//Start Business Logic

/**
 * The documentation's static files are stored in the subdirectory docs under public
 */
server.use("/docs", express.static("public/docs"));

/**
 * Main entry point to reach the home page of NotFlix
 */
server.get("/", (req, res) => {
  let responseText =
    "<h1>Welcome to NotFlix! 🍿</h1><h2>Not your mother's movie DB.</h2>";
  res.status(200).send(responseText);
});

server.get("/movies", (req, res) => {
  Movies.find().then((movies) => {
    res.status(200).json(movies);
  });
});

server.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Oh no! Something went wrong! 🙀");
    });
});

server.get("/movies/:movieTitle", (req, res) => {
  const { movieTitle } = req.params;
  Movies.find({ Title: `${movieTitle}` }, (err, movies) => {
    res.status(200).json(movies);
  });
});

server.post("/register", (req, res) => {
  const username = req.body.Username,
    password = req.body.Password,
    name = req.body.Name,
    email = req.body.Email,
    birthday = req.body.Birthday;

  Users.findOne({ Username: username })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send(`⛔ Bad Request: The user ${username} already exists.`);
      } else {
        Users.create({
          Username: username,
          Password: password,
          Name: name,
          Email: email,
          Birthday: new Date(birthday),
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .send("Internal server error: Something went wrong 😿 ");
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send("Everything broke, it's your fault! 😫 JK, it's not.");
    });
});

//End Business Logic

/**
 * Error handling middleware function
 */
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Genreal Server Error: Something went wrong 😿");
});

/**
 * Server listening on port number PORT
 * @param {number} PORT the port number
 */
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🤙 `);
});
