const { Movie } = require("../models/movie");
const MovieService = require("../services/movieService");

exports.home = (req, res) => {
  return MovieService.home(req, res);
};

exports.getMovieList = (req, res) => {
  return MovieService.getMovieList(req, res);
};

exports.getMovieDetails = (req, res) => {
  return MovieService.getMovieDetails(req, res);
};

exports.getMovieCast = (req, res) => {
  return MovieService.getMovieCast(req, res);
};
