var DirectorModel = require("../models/director");
const Directors = DirectorModel.Director;

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
