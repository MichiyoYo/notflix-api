const passport = require("passport"),
  LocalStrategy = require("passport-local"),
  UserModel = require("../models/user"),
  passportJWT = require("passport-jwt");

let Users = UserModel,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(username + " " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (err) {
          console.error(err);
          return callback(err);
        }
        if (!user) {
          console.err("Incorrect Username 🙅‍♀️");
          return callback(null, false, {
            message: "Incorrect Username or Password 🙅‍♀️",
          });
        }
        console.log("Done! 🧁");
        return callback(null, user);
      });
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
