/**
 * Services for Genre Model
 * @requires ../models/genre
 * @exports getGenreList
 * @exports getGenreDetails
 */

/**
 * @description the Genre Model
 * @ignore
 */
const GenreModel = require("../models/genre");

/**
 * @description the Gemres entity
 * @ignore
 */
const Genres = GenreModel.Genre;

/**
 * Endpoint: /genres
 * Retrieves the list of all the genres
 * @async
 * @function GET getGenreList
 * @param {Promise<string>} req the request
 * @param {Promise<object>} res the data from the storage
 */
exports.getGenreList = async function (req, res) {
  try {
    const genres = await Genres.find();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

/**
 * Endpoint: /genres/[name]
 * Retrieves the detals of a genre
 * @async
 * @function GET getGenreDetails
 * @param {Promise<string>} req the request
 * @param {Promise<string>} res the data from the storage
 * @example /genres/Thriller
 */
exports.getGenreDetails = async function (req, res) {
  const { name } = req.params;
  try {
    const genre = await Genres.findOne({ Name: name });
    if (genre) {
      res.status(200).json(genre);
    } else {
      res
        .status(404)
        .send(`Sorry, we don't have the genre "${name}" in our database! 🤷`);
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};
