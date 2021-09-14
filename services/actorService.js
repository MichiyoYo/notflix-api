var ActorModel = require("../models/actor");
const Actors = ActorModel.Actor;

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
