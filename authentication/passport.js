const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  UserModel = require("../models/user"),
  passportJWT = require("passport-jwt");

let Users = UserModel.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(`🔒 Authenticating user ${username}...`);
      Users.findOne(
        { $and: [{ Username: username }, { Password: password }] },
        (error, user) => {
          if (error) {
            console.log(error);
            return callback(error);
          }

          if (!user) {
            console.log("Incorrect username or password ⛔");
            return callback(null, false, {
              message: "Incorrect username or password ⛔",
            });
          }

          console.log("Ready! 🧁");
          return callback(null, user);
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "hY2zzGhxSxgz)hm&",
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
