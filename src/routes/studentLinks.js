const express = require("express");
const router = express.Router();
const pool = require("../database");
router.get("/all", async (req, res) => {
  const query = await pool.query("SELECT * FROM degree");
  res.send(query);
});

router.get("/post", async (req, res) => {
  res.render("partial/InsertStudent");
});

router.post("/post", async (req, res) => {
  const { name, surname, email } = req.body;
  const Student = {
    name,
    surname,
    email,
  };
  await pool.query("INSERT INTO student set ? ", [Student]);
  res.redirect("/studentInformation");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const student = await pool.query("SELECT * FROM student where id = ?", [id]);
  res.render("partial/editStudent", { student: student[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, surname, email } = req.body;
  const Student = {
    name,
    surname,
    email,
  };

  await pool.query(
    "UPDATE student set name = IFNULL(?, name), surname = IFNULL(?, surname), email = IFNULL(?, email) where id = ? ",
    [Student.name, Student.surname, Student.email, id]
  );
  res.redirect("/studentInformation");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM student WHERE id = ?", [id]);
  res.redirect("/studentInformation");
});

module.exports = router;
