const express = require("express");

const router = express.Router();


router.route("/").get((req, res) => {
  res.send("hahahah");
});

module.exports = router;
