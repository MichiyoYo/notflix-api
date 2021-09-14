/**
 * @fileOverview Server application where API endpoints are defined.
 * @author Cristina Lester
 * @version 1.0.0
 */

const express = require("express"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  createError = require("http-errors"),
  path = require("path"),
  cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalorRouter = require("./routes/catalog");

const app = express();

const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/NotFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS integration
let allowedOrigins = [
  "http://localhost:8080",
  "https://michiyoyo.github.io/notflix",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

//Authentication
let auth = require("./authentication/auth")(app);

app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "public/docs")));

//Setting up Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//Error handler
app.use(function (err, req, res, next) {
  //set locals to only provide error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send(`🛑 An error occurred: ${err}`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🤙 `);
});

module.exports = app;
