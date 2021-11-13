/**
 * Genre Controllers
 * @file Genre Controllers
 * @requires ../services/genreService
 * @exports getGenreList
 * @exports getGenreDetails
 * @ignore
 */

const GenreService = require("../services/genreService");

/**
 * Invokes getGenreList service and returns its result
 * @function getGenreList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getGenreList = (req, res) => {
  return GenreService.getGenreList(req, res);
};

/**
 * Invokes getGenreDetails service and returns its result
 * @function getGenreDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getGenreDetails = (req, res) => {
  return GenreService.getGenreDetails(req, res);
};
