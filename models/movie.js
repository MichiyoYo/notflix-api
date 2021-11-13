/**
 * Movie Model
 * @file models/movie.js
 * @ignore
 * @requires mongoose
 * @exports Movie the movie model
 */

const mongoose = require("mongoose");

/**
 * Movie Schema
 * @ignore
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  ImagePath: String,
  Featured: Boolean,
  ReleaseDate: Date,
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    BirthDate: Date,
    DeathDate: Date,
  },
  Cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});

let Movie = mongoose.model("Movie", movieSchema);
module.exports.Movie = Movie;
