/**
 * Actor Model
 * @file Actor Model
 * @requires mongoose
 * @exports Actor the actor model
 * @ignore
 */

const mongoose = require("mongoose");

/**
 * Actor Schema
 * @ignore
 */
let actorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  Filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let Actor = mongoose.model("Actor", actorSchema);
module.exports.Actor = Actor;
