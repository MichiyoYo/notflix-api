/**
 * Services for Movie Model
 * @requires ../models/movie
 * @exports home
 * @exports getMovieList
 * @exports getMovieDetails
 * @exports getMovieCast
 */

/**
 * @description the movie model
 * @ignore
 */
const MovieModel = require("../models/movie"),
  path = require("path");

/**
 * @description the Movies entity
 * @ignore
 */
const Movies = MovieModel.Movie;

/**
 * Serves to the index page
 * @function home
 * @param {Promise<string>} req the request
 * @param {Promise<File>} res the page content
 * @ignore
 */
exports.home = function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};

/**
 * Endpoint: /movies
 * Retrieves the list of all the movies
 * @async
 * @function GET getMovieList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the data from the storage
 */
exports.getMovieList = async function (req, res) {
  try {
    const movies = await Movies.find().populate("Cast", "Name");
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

/**
 * Endpoint: /movies/[movieTitle]
 * Retrieves the details of a movie
 * @async
 * @function GET getMovieDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the data from the storage
 * @example /movies/Parasite
 */
exports.getMovieDetails = async function (req, res) {
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
        .send(
          `Sorry, we don't have the movie "${movieTitle}" in our database! 🤷`
        );
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

/**
 * Endpoint: /movies/[movieTitle]/cast
 * Retrieves the cast of a movie
 * @async
 * @function GET getMovieCast
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the data from the storage
 * @example /movies/Parasite/cast
 */
exports.getMovieCast = async function (req, res) {
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
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};
