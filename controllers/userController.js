const UserService = require("../services/userService");

exports.getUserList = (req, res) => {
  return UserService.getUserList(req, res);
};

exports.getUserDetails = (req, res) => {
  return UserService.getUserDetails(req, res);
};

exports.getUserFavs = (req, res) => {
  return UserService.getUserFavs(req, res);
};

exports.getUserWatchList = (req, res) => {
  return UserService.getUserWatchList(req, res);
};

exports.userRegister = (req, res) => {
  return UserService.userRegister(req, res);
};

exports.userUpdate = (req, res) => {
  return UserService.userUpdate(req, res);
};

exports.userAddToFavs = (req, res) => {
  return UserService.userAddToFavs(req, res);
};

exports.userAddToWatchList = (req, res) => {
  return UserService.userAddToWatchList(req, res);
};

exports.userRemoveFromFavs = (req, res) => {
  return UserService.userRemoveFromFavs(req, res);
};

exports.userRemoveFromWatchList = (req, res) => {
  return UserService.userRemoveFromWatchList(req, res);
};

exports.userDeregister = (req, res) => {
  return UserService.userDeregister(req, res);
};
