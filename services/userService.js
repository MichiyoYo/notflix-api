const UserModel = require("../models/user");
const Users = UserModel.User;

exports.getUserList = async function (req, res) {
  try {
    const users = await Users.find()
      .populate("FavoriteMovies", "Title")
      .populate("WatchList", "Title");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

exports.getUserDetails = async function (req, res) {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ Username: username })
      .populate("FavoriteMovies", "Title")
      .populate("WatchList", "Title");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(`Sorry, the user ${username} doesn't exist! 🤷`);
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

exports.getUserFavs = async function (req, res) {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ Username: username }).populate(
      "FavoriteMovies",
      "Title"
    );
    if (!user) {
      res
        .status(404)
        .send(
          `Sorry, we don't have the user "${username}" in our database! 🤷`
        );
    } else {
      res.status(200).json({
        Favorites: user.FavoriteMovies,
      });
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

exports.getUserWatchList = async function (req, res) {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ Username: username }).populate(
      "WatchList",
      "Title"
    );
    if (!user) {
      res
        .status(404)
        .send(
          `Sorry, we don't have the user "${username}" in our database! 🤷`
        );
    } else {
      res.status(200).json({
        WatchList: user.WatchList,
      });
    }
  } catch (err) {
    res.status(500).send(`
    Oh no! Something went wrong! 😱
    Error: ${err}
    `);
  }
};

exports.userRegister = function (req, res) {
  const username = req.body.Username,
    password = req.body.Password,
    name = req.body.Name,
    email = req.body.Email,
    birthDate = req.body.BirthDate;

  let hashedPassword = Users.hashPassword(password);

  Users.findOne({ Username: username })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send(`⛔ Bad Request: The user ${username} already exists.`);
      } else {
        Users.create({
          Username: username,
          Password: hashedPassword,
          Name: name,
          Email: email,
          BirthDate: new Date(birthDate),
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send(`
            Oh no! Something went wrong! 😱
            Error: ${err}
            `);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Oh no! Something went wrong! 😱
      Error: ${err}
      `);
    });
};

exports.userUpdate = function (req, res) {
  const { username } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Name: req.body.Name,
        Email: req.body.Email,
        BirthDate: req.body.BirthDate,
      },
    },
    { new: true, upsert: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res
          .status(404)
          .send("Sorry, we don't have that user in our database! 🤷");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Oh no! Something went wrong! 😱
      Error: ${err}
      `);
    });
};

exports.userAddToFavs = function (req, res) {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $addToSet: {
        FavoriteMovies: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully added to ${username}'s list of favorites! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Oh no! Something went wrong! 😱
      Error: ${err}
      `);
    });
};

exports.userAddToWatchList = function (req, res) {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $addToSet: {
        WatchList: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully added to ${username}'s watch list! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`
      Oh no! Something went wrong! 😱
      Error: ${err}
      `);
    });
};

exports.userRemoveFromFavs = function (req, res) {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $pull: {
        FavoriteMovies: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully removed from ${username}'s list of favorites! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
};

exports.userRemoveFromWatchList = function (req, res) {
  const { username, movieId } = req.params;
  Users.findOneAndUpdate(
    { Username: username },
    {
      $pull: {
        WatchList: movieId,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res
        .status(200)
        .send(
          `The movie has been successfully removed from ${username}'s watch list! 👌`
        );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
};

exports.userDeregister = function (req, res) {
  const { username } = req.params;
  Users.findOneAndRemove({ Username: username })
    .then((usrtoRemove) => {
      if (!usrtoRemove) {
        res.status(404).send(`The user ${username} doesn't exist. 🤷`);
      } else {
        res
          .status(200)
          .send(`The user ${username} was successfully deregistered. 👋`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(errorMsg(500, err));
    });
};
