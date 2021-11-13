/**
 * User Model
 * @requires mongoose
 * @requires bcrypt
 * @exports User the user model
 * @ignore
 */

const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

/**
 * User schema
 * @ignore
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Name: String,
  Email: { type: String, required: true },
  BirthDate: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  WatchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Encrypts a password by generating a hash out of the original string
 * @param {string} password the original password
 * @returns a hashed password
 * @ignore
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates a password
 * @param {string} password the password to validate
 * @returns the result of the validation
 * @ignore
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let User = mongoose.model("User", userSchema);
module.exports.User = User;
