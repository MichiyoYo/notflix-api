/**
 * User Controllers
 * @file User Controllers
 * @requires ../services/userService
 * @exports getUserList
 * @exports getUserDetails
 * @exports getUserFavs
 * @exports getUserWatchList
 * @exports userRegister
 * @exports userUpdate
 * @exports userAddToFavs
 * @exports userAddToWatchList
 * @exports userRemoveFromFavs
 * @exports userRemoveFromWatchList
 * @exports userDeregister
 * @ignore
 */

const UserService = require("../services/userService");

/**
 * Invokes getUserList service and returns its result
 * @function getUserList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getUserList = (req, res) => {
  return UserService.getUserList(req, res);
};

/**
 * Invokes getUserDetails service and returns its result
 * @function getUserDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getUserDetails = (req, res) => {
  return UserService.getUserDetails(req, res);
};

/**
 * Invokes getUserFavs service and returns its result
 * @function getUserFavs
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getUserFavs = (req, res) => {
  return UserService.getUserFavs(req, res);
};

/**
 * Invokes getUserWatchlist service and returns its result
 * @function getUserWatchList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getUserWatchList = (req, res) => {
  return UserService.getUserWatchList(req, res);
};

/**
 * Invokes userRegister service and returns its result
 * @function userRegister
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userRegister = (req, res) => {
  return UserService.userRegister(req, res);
};

/**
 * Invokes userUpdate service and returns its result
 * @function userUpdate
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userUpdate = (req, res) => {
  return UserService.userUpdate(req, res);
};

/**
 * Invokes userAddToFavs service and returns its result
 * @function userAddToFavs
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userAddToFavs = (req, res) => {
  return UserService.userAddToFavs(req, res);
};

/**
 * Invokes userAddToWatchlist service and returns its result
 * @function userAddToWatchlist
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userAddToWatchList = (req, res) => {
  return UserService.userAddToWatchList(req, res);
};

/**
 * Invokes userRemoveFromFavs service and returns its result
 * @function userRemoveFromFavs
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userRemoveFromFavs = (req, res) => {
  return UserService.userRemoveFromFavs(req, res);
};

/**
 * Invokes userRemoveFromWatchlist service and returns its result
 * @function userRemoveFromWatchlist
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userRemoveFromWatchList = (req, res) => {
  return UserService.userRemoveFromWatchList(req, res);
};

/**
 * Invokes userDeregister service and returns its result
 * @function userDeregister
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.userDeregister = (req, res) => {
  return UserService.userDeregister(req, res);
};
