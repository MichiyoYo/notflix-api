var express = require("express"),
  router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/catalog");
});

//Add redirects here

module.exports = router;
