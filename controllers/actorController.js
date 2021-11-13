/**
 * Actor Controllers
 * @file Actor Controllers
 * @requires ../services/actorService
 * @exports getActorList
 * @exports getActorDetails
 * @ignore
 */

const ActorService = require("../services/actorService");

/**
 * Invokes getActorList service and returns its result
 * @function getActorList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getActorList = (req, res) => {
  return ActorService.getActorList(req, res);
};

/**
 * Invokes getActorDetails service and returns its result
 * @function getActorDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the response
 * @returns an object holding the result of the service call
 */
exports.getActorDetails = (req, res) => {
  return ActorService.getActorDetails(req, res);
};
