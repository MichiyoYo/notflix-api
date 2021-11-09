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

//Database Connection

//Local Database
/*
mongoose.connect("mongodb://localhost:27017/NotFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

//Atlas Database
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS integration
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

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
