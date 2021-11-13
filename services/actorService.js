/**
 * Services for Actor Model
 * @requires ../models/actor
 * @exports getActorList
 * @exports getActorDetails
 */

/**
 * @description the actor model
 * @ignore
 */
var ActorModel = require("../models/actor");

/**
 * @description the Actors entity
 * @ignore
 */
const Actors = ActorModel.Actor;

/**
 * Endpoint: /actors
 * Retrieves the list of all the actors
 * @async
 * @function GET getActorList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the data from the storage
 */
exports.getActorList = async function (req, res) {
  try {
    const actors = await Actors.find().populate("Filmography", "Title");
    res.status(200).json(actors);
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

/**
 * Endpoint: /actors/[name]
 * Retrieves the detals of an actor
 * @async
 * @function GET getActorDetails
 * @param {Promise<string>} req the request
 * @param {Promise<string>} res the data from the storage
 * @example /actors/Harrison%20Ford
 */
exports.getActorDetails = async function (req, res) {
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
        .send(`Sorry, we don't have the actor "${name}" in our database! 🤷`);
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};
