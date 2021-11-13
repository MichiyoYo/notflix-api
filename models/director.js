/**
 * Director Model
 * @file Director Model
 * @requires mongoose
 * @exports Director the director model
 * @ignore
 */

const mongoose = require("mongoose");

/**
 * Director Schema
 * @ignore
 */
let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  BirthDate: Date,
  DeathDate: Date,
  Filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let Director = mongoose.model("Director", directorSchema);
module.exports.Director = Director;
