const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/all", async (req, res) => {
  const teachers = await pool.query("SELECT * FROM teacher");
  res.send(teachers);
});

router.get("/post", async (req, res) => {
  const degrees = await pool.query("SELECT * FROM degree");
  res.render("partial/Insert", { result: degrees });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM teacher WHERE id = ?", [id]);
  res.redirect("/teacherInformation");
});

router.post("/post", async (req, res) => {
  const { name, surname, email, degree_id } = req.body;
  const updateTeacher = {
    name,
    surname,
    email,
    degree_id,
  };

  await pool.query("INSERT INTO teacher set ? ", [updateTeacher]);
  res.redirect("/teacherInformation");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const teachers = await pool.query("SELECT * FROM teacher WHERE id = ?", [id]);
  const degrees = await pool.query("SELECT * FROM degree");
  res.render("partial/edit", { teacher: teachers[0], degrees: degrees });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, description } = req.body;
  const updateTeacher = {
    name,
    surname,
    email,
    description,
  };
  const updateJob = await pool.query(
    "SELECT id from degree where description = ?",
    [updateTeacher.description]
  );

  await pool.query(
    "UPDATE teacher set name = IFNULL(?, name), surname = IFNULL(?, surname), email = IFNULL(?, email), degree_id = IFNULL(?, degree_id) where id = ? ",
    [
      updateTeacher.name,
      updateTeacher.surname,
      updateTeacher.email,
      updateJob[0].id,
      id,
    ]
  );
  res.redirect("/teacherInformation");
});

module.exports = router;
