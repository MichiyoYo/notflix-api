var express = require("express"),
  router = express.Router();

//Require controller modules
const movieController = require("../controllers/movieController"),
  genreController = require("../controllers/genreController"),
  directorController = require("../controllers/directorController"),
  actorController = require("../controllers/actorController");

//Home
/**
 * Main endpoit to reach the home page of NotFlix
 */
router.get("/", movieController.home);

//Movie Routes

/**
 * Endpoint: /movies
 * @returns A JSON holding the data about all the movies.
 */
router.get("/movies", movieController.getMovieList);

/**
 * Endpoint: /movies/[movieTitle]
 * @param {String} movieTite the title of the movie we are looking for (if there are spaces in the title use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single movie.
 * @example /movies/Parasite
 */
router.get("/movies/:movieTitle", movieController.getMovieDetails);

/**
 * Endpoint: /movies/[movieTitle]/cast
 * @param {String} movieTitle the title of the movie we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about the cast of the movie.
 * @example /movies/Parasite/cast
 */
router.get("/movies/:movieTitle/cast", movieController.getMovieCast);

//Genre Routes

/**
 * Endpoint: /genres
 * @returns A JSON holding the data about all the genres.
 */
router.get("/genres", genreController.getGenreList);

/**
 * Endpoint: /genres/[name]
 * @param {String} name the name of the genre we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single genre.
 * @example /genres/Thriller
 */
router.get("/genres/:name", genreController.getGenreDetails);

//Director Routes

/**
 * Endpoint: /directors
 * @returns A JSON holding the data about all the directors.
 */
router.get("/directors", directorController.getDirectorList);

/**
 * Endpoint: /directors/[name]
 * @param {String} name the name of the genre we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single genre.
 * @example /directors/Steven%20Spielberg
 */
router.get("/directors/:name", directorController.getDiretctorDetails);

//Actor Routes

/**
 * Endpoint: /actors
 * @returns A JSON holding the data about all the actors.
 */
router.get("/actors", actorController.getActorList);

/**
 * Endpoint: /actors/[name]
 * @param {String} name the name of the actor we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single actor.
 * @example /actors/Harrison%20Ford
 */
router.get("/actors/:name", actorController.getActorDetails);

module.exports = router;
