const GenreService = require("../services/genreService");

exports.getGenreList = (req, res) => {
  return GenreService.getGenreList(req, res);
};

exports.getGenreDetails = (req, res) => {
  return GenreService.getGenreDetails(req, res);
};
