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

let Movie = mongoose.model("Movie", movieSchema);
module.exports.Movie = Movie;
