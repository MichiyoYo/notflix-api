const MovieModel = require("../models/movie"),
  path = require("path");
const Movies = MovieModel.Movie;

exports.home = function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};

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
