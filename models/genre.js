/**
 * Genre Model
 * @file Genre Model
 * @requires mongoose
 * @exports Genre the movie model
 * @ignore
 */
const mongoose = require("mongoose");

/**
 * Genre Schema
 * @ignore
 */
let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

let Genre = mongoose.model("Genre", genreSchema);
module.exports.Genre = Genre;
