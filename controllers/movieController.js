/**
 * Movie Controllers
 * @file Movie Controllers
 * @requires ../services/movieService
 * @exports home
 * @exports getMovieList
 * @exports getMovieDetails
 * @exports getMovieCast
 * @ignore
 */

const { Movie } = require("../models/movie");

const MovieService = require("../services/movieService");

/**
 * Invokes home service and returns its result
 * @function home
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.home = (req, res) => {
  return MovieService.home(req, res);
};

/**
 * Invokes getMovieList service and returns its result
 * @function getMovieList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getMovieList = (req, res) => {
  return MovieService.getMovieList(req, res);
};

/**
 * Invokes getMovieDetails service and returns its result
 * @function getMovieDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getMovieDetails = (req, res) => {
  return MovieService.getMovieDetails(req, res);
};

/**
 * Invokes getMovieCast service and returns its result
 * @function getMovieCast
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getMovieCast = (req, res) => {
  return MovieService.getMovieCast(req, res);
};
