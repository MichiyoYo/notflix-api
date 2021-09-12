const mongoose = require("mongoose");

let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  BirthDate: Date,
  DeathDate: Date,
  Filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let Director = mongoose.model("Director", directorSchema);
module.exports.Director = Director;
