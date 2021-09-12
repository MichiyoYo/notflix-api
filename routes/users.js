var express = require("express"),
  router = express.Router();

const userController = require("../controllers/userController");

//User Routes

/**
 * Endpoint: /users
 * @returns A JSON holding the data about all the users.
 */
router.get("/", userController.getUserList);

/**
 * Endpoint: /users/[username]
 * @param {String} username the username of the user we are looking for (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about a single user.
 * @example /users/mochi
 */
router.get("/:username", userController.getUserDetails);

/**
 * Endpoint: /users/[username]/favorites
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about the favorite movies of the user.
 * @example /users/loejester/favorites
 */
router.get("/:username/favorites", userController.getUserFavs);

/**
 * Endpoint: /users/[username]/watchlist
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A JSON object holding the data about the watch list of the user.
 * @example /users/loejester/watchlist
 */
router.get("/:username/watchlist", userController.getUserWatchList);

/**
 * Endpoint: /register
 * The info of the new user must be sent in the body of the request as a JSON object in the format:
 * {
 *  "Username" : "mochi",
 *  "Password" : "ihatedogs",
 *  "Name" : "Mochi Abigail Lester",
 *  "Email" : "mochithecat@meow.com",
 *  "BirthDate" : new Date("2018-11-15"),
 * }
 * @returns A JSON object holding the data of the new user
 */
router.post("/register", userController.userRegister);

/**
 * Endpoint: /users/[username]
 * The fields to update must be sent in the body of the request as a JSON object in the format:
 * {
 *  "Username" : "newusername",
 *  "Password" : "newpassword"
 *   ...
 * }
 * @returns A JSON object holding the data of the new user
 * @example /users/mochi
 */
router.put("/:username", userController.userUpdate);

/**
 * Endpoint: /users/[username]/favorites/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to add
 * @returns A message indicating that the movie has been successfully added to the list of the user's favorites.
 * @example /users/mochi/favorites/6138df5bc6e139efe0c91ca2
 */
router.post("/:username/favorites/:movieId", userController.userAddToFavs);

/**
 * Endpoint: /users/[username]/watchlist/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to add
 * @returns 	A message indicating that the movie has been successfully added to the list of the user's watch list.
 * @example /users/mochi/watchlist/6138df5bc6e139efe0c91ca2
 */
router.post("/:username/watchlist/:movieId", userController.userAddToWatchList);

/**
 * Endpoint: /users/[username]/favorites/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to remove
 * @returns 	A message indicating that the movie has been successfully removed from the list of the user's favorites.
 * @example /users/mochi/favorites/6138df5bc6e139efe0c91ca2
 */
router.delete(
  "/:username/favorites/:movieId",
  userController.userRemoveFromFavs
);

/**
 * Endpoint: /users/[username]/watchlist/[movieId]
 * @param {String} username username of the user we are inquiring (if there are spaces in the username use the metacharacter %20 as spacer)
 * @param {String} movieId the id of the movie we want to remove
 * @returns 	A message indicating that the movie has been successfully removed from the list of the user's watch list.
 * @example /users/mochi/watchlist/6138df5bc6e139efe0c91ca2
 */
router.delete(
  "/:username/watchlist/:movieId",
  userController.userRemoveFromFavs
);

/**
 * Endpoint: /users/[username]/deregister
 * @param {String} username username of the user we want to remove(if there are spaces in the username use the metacharacter %20 as spacer)
 * @returns A message indicating that the movie has been successfully removed from the user's watchlist.
 * @example /users/mochi/deregister
 */
router.delete("/:username/deregister", userController.userDeregister);

module.exports = router;
