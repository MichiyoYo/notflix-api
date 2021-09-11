/**
 * @fileOverview Server application where API endpoints are defined.
 * @author Cristina Lester
 * @version 1.0.0
 */

const express = require("express"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  Models = require("./models/models.js");

const server = express();
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

/**
 * @param {number} status the error status
 * @param {*} err the error that was catched by the calling function
 * @returns a string containing a message about the error status
 */
function errorMsg(status, err) {
  let msg = "";
  switch (status) {
    case 500:
      msg = `
      Oh no! Something went wrong! 😱
      Error: ${err}
      `;
      break;
    case 404:
      msg = `
      I found nothing, sorry! 🦗
      `;
    case 400:
      msg = `
      Bad Request! 👎
      Error: ${err}
      `;
      break;
    default:
      msg = `
      Something bad happened and we don't know what it is 🙀!
      Error: ${err}
      `;
  }
  return msg;
}

/**
 * The documentation's static files are stored in the subdirectory docs under public
 */
server.use("/docs", express.static("public/docs"));

/**
 * Main endpoit to reach the home page of NotFlix
 */
server.get("/", (req, res) => {
  let responseText =
    "<h1>Welcome to NotFlix! 🍿</h1><h2>Not your mother's movie DB.</h2>";
  res.status(200).send(responseText);
});

//General search
/**
 * Endpoint: /movies
 * @returns A JSON holding the data about all the movies.
 */
server.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.find().populate("Cast", "Name");
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /users
 * @returns A JSON holding the data about all the users.
 */
server.get("/users", async (req, res) => {
  try {
    const users = await Users.find()
      .populate("FavoriteMovies", "Title")
      .populate("WatchList", "Title");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /genres
 * @returns A JSON holding the data about all the genres.
 */
server.get("/genres", async (req, res) => {
  try {
    const genres = await Genres.find();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /directors
 * @returns A JSON holding the data about all the directors.
 */
server.get("/directors", async (req, res) => {
  try {
    const directors = await Directors.find().populate("Filmography", "Title");
    res.status(200).json(directors);
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /actors
 * @returns A JSON holding the data about all the actors.
 */
server.get("/actors", async (req, res) => {
  try {
    const actors = await Actors.find().populate("Filmography", "Title");
    res.status(200).json(actors);
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

//Detailed search

/**
 * Endpoint: /movies/[movieTitle]
 * @param {String} movieTite the title of the movie we are looking for (if there are spaces in the title use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single movie.
 * @example /movies/Parasite
 */
server.get("/movies/:movieTitle", async (req, res) => {
  const { movieTitle } = req.params;
  try {
    const movie = await Movies.findOne({ Title: movieTitle }).populate(
      "Cast",
      "Name"
    );
    if (movie) {
      res.status(200).json(movie);
    } else {
      res
        .status(404)
        .send("Sorry, we don't have that movie in our database! 🤷");
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /users/[username]
 * @param {String} username the username of the user we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single user.
 * @example /users/mochi
 */
server.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ Username: username })
      .populate("FavoriteMovies", "Title")
      .populate("WatchList", "Title");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(`Sorry, the user ${username} doesn't exist! 🤷`);
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /genres/[name]
 * @param {String} name the name of the genre we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single genre.
 * @example /genres/Thriller
 */
server.get("/genres/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const genre = await Genres.findOne({ Name: name });
    if (genre) {
      res.status(200).json(genre);
    } else {
      res
        .status(404)
        .send(`Sorry, we don't have the genre ${genre} in our database! 🤷`);
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /directors/[name]
 * @param {String} name the name of the genre we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single genre.
 * @example /directors/Steven%20Spielberg
 */
server.get("/directors/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const director = await Directors.findOne({ Name: name }).populate(
      "Filmography",
      "Title"
    );
    if (director) {
      res.status(200).json(director);
    } else {
      res
        .status(404)
        .send(`Sorry, we don't have the director ${name} in our database! 🤷`);
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /actors/[name]
 * @param {String} name the name of the actor we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single actor.
 * @example /actors/Harrison%20Ford
 */
server.get("/actors/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const actor = await Actors.findOne({ Name: name }).populate(
      "Filmography",
      "Title"
    );
    if (actor) {
      res.status(200).json(actor);
    } else {
      res
        .status(404)
        .send(`Sorry, we don't have the actor ${name} in our database! 🤷`);
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /movies/[movieTitle]/cast
 * @param {String} movieTitle the title of the movie we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about the cast of the movie.
 * @example /movies/Parasite/cast
 */
server.get("/movies/:movieTitle/cast", async (req, res) => {
  const { movieTitle } = req.params;
  try {
    const movie = await Movies.findOne({ Title: movieTitle }).populate({
      path: "Cast",
      select: "Name -_id",
    });
    if (!movie) {
      res
        .status(404)
        .send(
          `Sorry, we don't have the movie "${movieTitle}" in our database! 🤷`
        );
    } else {
      res.status(200).json({
        Cast: movie.Cast,
      });
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /users/[username]/favorites
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about the favorite movies of the user.
 * @example /users/loejester/favorites
 */
server.get("/users/:username/favorites", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ Username: username }).populate({
      path: "FavoriteMovies",
      select: "Title -_id",
    });
    if (!user) {
      res
        .status(404)
        .send(
          `Sorry, we don't have the user "${username}" in our database! 🤷`
        );
    } else {
      res.status(200).json({
        Favorites: user.FavoriteMovies,
      });
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /users/[username]/watchlist
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about the watch list of the user.
 * @example /users/loejester/watchlist
 */
server.get("/users/:username/watchlist", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ Username: username }).populate({
      path: "WatchList",
      select: "Title -_id",
    });
    if (!user) {
      res
        .status(404)
        .send(
          `Sorry, we don't have the user "${username}" in our database! 🤷`
        );
    } else {
      res.status(200).json({
        WatchList: user.WatchList,
      });
    }
  } catch (err) {
    res.status(500).send(errorMsg(500, err));
  }
});

/**
 * Endpoint: /register
 * The info of the new user must be sent in the body of the request as a JSON object in the format:
 * {
 *  "Username" : "mochi",
 *  "Password" : "ihatedogs",
 *  "Name" : "Mochi Abigail Lester",
 *  "Email" : "mochithecat@meow.com",
 *  "BirthDate" : new Date("2018-11-15"),
 * }
 * @returns A JSON object holding the data of the new user
 */
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
          .catch((err) => {
            console.error(err);
            res.status(500).send(errorMsg(500, err));
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Endpoint: /users/[username]
 * The fields to update must be sent in the body of the request as a JSON object in the format:
 * {
 *  "Username" : "newusername",
 *  "Password" : "newpassword"
 *   ...
 * }
 * @returns A JSON object holding the data of the new user
 * @example /users/mochi
 */
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
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Endpoint: /users/[username]/favorites/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to add
 * @returns A message indicating that the movie has been successfully added to the list of the user's favorites.
 * @example /users/mochi/favorites/6138df5bc6e139efe0c91ca2
 */
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
          `The movie has been successfully added to ${username}'s list of favorites! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Endpoint: /users/[username]/watchlist/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to add
 * @returns 	A message indicating that the movie has been successfully added to the list of the user's watch list.
 * @example /users/mochi/watchlist/6138df5bc6e139efe0c91ca2
 */
server.post("/users/:username/watchlist/:movieId", (req, res) => {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $addToSet: {
        WatchList: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully added to ${username}'s watch list! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Endpoint: /users/[username]/favorites/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to remove
 * @returns 	A message indicating that the movie has been successfully removed from the list of the user's favorites.
 * @example /users/mochi/favorites/6138df5bc6e139efe0c91ca2
 */
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
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Endpoint: /users/[username]/watchlist/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to remove
 * @returns 	A message indicating that the movie has been successfully removed from the list of the user's watch list.
 * @example /users/mochi/watchlist/6138df5bc6e139efe0c91ca2
 */
server.delete("/users/:username/watchlist/:movieId", (req, res) => {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $pull: {
        WatchList: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully removed from ${username}'s watch list! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Endpoint: /users/[username]/deregister
 * @param {String} username username of the user we want to remove(if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A message indicating that the movie has been successfully removed from the user's watchlist.
 * @example /users/mochi/deregister
 */
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
      res.status(500).send(errorMsg(500, err));
    });
});

/**
 * Error handling middleware function
 */
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(errorMsg(500, err));
});

/**
 * Server listening on port number PORT
 * @param {number} PORT the port number
 */
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🤙 `);
});
