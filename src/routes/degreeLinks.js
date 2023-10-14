const express = require("express");
const router = express.Router();
const pool = require("../database");
router.get("/all", async (req, res) => {
  const query = await pool.query("SELECT * FROM degree");
  res.send(query);
});

router.get("/post", async (req, res) => {
  res.render("partial/InsertDegree");
});

router.post("/post", async (req, res) => {
  const { description } = req.body;
  const updateDegree = {
    description,
  };
  await pool.query("INSERT INTO degree set ? ", [updateDegree]);
  res.redirect("/degreeInformation");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const degrees = await pool.query("SELECT * FROM degree where id = ?", [id]);
  console.log(degrees);
  res.render("partial/editDegree", { degree: degrees[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateDegree = {
    description,
  };
  await pool.query(
    "UPDATE degree set description = IFNULL(?, description) where id = ? ",
    [updateDegree.description, id]
  );
  res.redirect("/degreeInformation");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  pool.query("DELETE  FROM degree WHERE id = ?", [id]);
  res.redirect("/degreeInformation");
});

module.exports = router;
