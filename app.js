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
const { update } = require("lodash");
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
      res.status(500).send(`
      Oh no! Something went wrong! 🙀
      Error: ${err}
      `);
    });
});

server.get("/movies/:movieTitle", (req, res) => {
  const { movieTitle } = req.params;
  Movies.findOne({ Title: movieTitle })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res
          .status(404)
          .send("Sorry, we don't have that movie in our database! 🤷");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Oh no! Something went wrong! 🙀
      Error: ${err}
      `);
    });
});

server.post("/register", (req, res) => {
  const username = req.body.Username,
    password = req.body.Password,
    name = req.body.Name,
    email = req.body.Email,
    birthDate = req.body.BirthDate;

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
          BirthDate: new Date(birthDate),
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send(`
              Oh no! Something went wrong! 🙀
              Error: ${err}
              `);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
        Everything broke, it's your fault! 😫 JK, it's not.
        This is what actually happened: ${err}
        `);
    });
});

//update user info
server.put("/users/:username", (req, res) => {
  const { username } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Name: req.body.Name,
        Email: req.body.Email,
        BirthDate: req.body.BirthDate,
      },
    },
    { new: true, upsert: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res
          .status(404)
          .send("Sorry, we don't have that user in our database! 🤷");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
          Oh no! Something went wrong! 🙀
          Error: ${err}
        `);
    });
});

//add movie to user's list of favorites
server.post("/users/:username/favorites/:movieId", (req, res) => {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $addToSet: {
        FavoriteMovies: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully added to ${username}'s list of favorites!`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Something happened and it's not a good thing. 😱
      Error: ${err}
      `);
    });
});

//remove movie to user's list of favorites
server.delete("/users/:username/favorites/:movieId", (req, res) => {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $pull: {
        FavoriteMovies: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully removed from ${username}'s list of favorites! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Something happened and it's not a good thing. 😱
      Error: ${err}
      `);
    });
});

server.delete("/users/:username/deregister", (req, res) => {
  const { username } = req.params;
  Users.findOneAndRemove({ Username: username })
    .then((usrtoRemove) => {
      if (!usrtoRemove) {
        res.status(404).send(`The user ${username} doesn't exist. 🤷`);
      } else {
        res
          .status(200)
          .send(`The user ${username} was successfully deregistered. 👋`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Something happened and it's not a good thing. 😱
      Error: ${err}
      `);
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
