/**
 * Director Controllers
 * @file Director Controllers
 * @requires ../services/directorService
 * @exports getDirectorList
 * @exports getDiretctorDetails
 * @ignore
 */

const DirectorService = require("../services/directorService");

/**
 * Invokes getDirectorList service and returns its result
 * @function getDirectorList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getDirectorList = (req, res) => {
  return DirectorService.getDirectorList(req, res);
};

/**
 * Invokes getDiretctorDetails service and returns its result
 * @function getDiretctorDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getDiretctorDetails = (req, res) => {
  return DirectorService.getDiretctorDetails(req, res);
};
