const GenreModel = require("../models/genre");
const Genres = GenreModel.Genre;

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
