const DirectorService = require("../services/directorService");

exports.getDirectorList = (req, res) => {
  return DirectorService.getDirectorList(req, res);
};

exports.getDiretctorDetails = (req, res) => {
  return DirectorService.getDiretctorDetails(req, res);
};
