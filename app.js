/**
 * @fileOverview Server application where API endpoints are defined.
 * @author Cristina Lester
 * @version 1.0.0
 */

const express = require("express"),
  morgan = require("morgan"),
  mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalorRouter = require("./routes/catalog");

const app = express();

const PORT = 8080;

mongoose.connect("mongodb://localhost:27017/NotFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware libraries

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/docs", express.static("public/docs"));

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
  res.locals.error = req.app.get("evn") === "development" ? err : {};
  res.status(err.status || 500).send(
    `
  Onoes, something bad happened! 🙀
  Error: ${err}
  `
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🤙 `);
});

module.exports = app;
