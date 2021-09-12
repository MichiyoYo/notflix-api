const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Name: String,
  Email: { type: String, required: true },
  BirthDate: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  WatchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let User = mongoose.model("User", userSchema);
module.exports.User = User;
