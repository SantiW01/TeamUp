const express = require("express");
const router = express.Router();
const pool = require("../database");
router.get("/login", async (req, res) => {
  res.render("partial/LogIn");
});

router.get("/signup", async (req, res) => {
  res.render("partial/SignUp");
});

module.exports = router;
