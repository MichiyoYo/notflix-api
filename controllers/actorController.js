const ActorService = require("../services/actorService");

exports.getActorList = (req, res) => {
  return ActorService.getActorList(req, res);
};

exports.getActorDetails = (req, res) => {
  return ActorService.getActorDetails(req, res);
};
