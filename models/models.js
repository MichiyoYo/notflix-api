const mongoose = require("mongoose");

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

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Name: String,
  Email: { type: String, required: true },
  BirthDate: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  WatchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let actorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  Filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  BirthDate: Date,
  DeathDate: Date,
  Filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Actor = mongoose.model("Actor", actorSchema);
let Director = mongoose.model("Director", directorSchema);
let Genre = mongoose.model("Genre", genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Actor = Actor;
module.exports.Director = Director;
module.exports.Genre = Genre;
