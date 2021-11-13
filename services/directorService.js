/**
 * Services for Director Model
 * @requires ../models/director
 * @exports getDirectorList
 * @exports getActorList
 */

/**
 * @description the director model
 * @ignore
 */
const DirectorModel = require("../models/director");

/**
 * @description the Directors entity
 * @ignore
 */
const Directors = DirectorModel.Director;

/**
 * Endpoint: /directors
 * Retrieves the list of all the directors
 * @async
 * @function GET getDirectorList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the data from the storage
 */
exports.getDirectorList = async function (req, res) {
  try {
    const directors = await Directors.find().populate("Filmography", "Title");
    res.status(200).json(directors);
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

/**
 * Endpoint: /directors/[name]
 * Retrieves the details of a director
 * @async
 * @function GET getDiretctorDetails
 * @param {Promise<string>} req the request
 * @param {Promise<object>}} res the data from the storage
 * @example /directors/Steven%20Spielberg
 */
exports.getDiretctorDetails = async function (req, res) {
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
        .send(
          `Sorry, we don't have the director "${name}"" in our database! 🤷`
        );
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};
