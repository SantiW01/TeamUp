const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/teacherInformation", async (req, res) => {
  const query = await pool.query(
    "SELECT t.id as 'id', concat(t.name, ' ', t.surname) as 'fullName', t.email as 'email', d.description as 'degree' from teacher as t inner join degree as d where t.degree_id = d.id"
  );
  console.log(query);
  res.render("partial/teacherInfo", { result: query });
});

router.get("/degreeInformation", async (req, res) => {
  const query = await pool.query("SELECT * from degree");
  res.render("partial/DegreeInfo", { result: query });
});

router.get("/studentInformation", async (req, res) => {
  const query = await pool.query(
    "SELECT s.id, concat(s.name, ' ', s.surname) as 'fullName', s.email  FROM student as s"
  );
  res.render("partial/studentInfo", { result: query });
});

router.get("/coursesInformation", async (req, res) => {
  const query = await pool.query(
    "SELECT tc.id, tc.description, c.courseSchedule, concat(t.name, ' ', t.surname) as 'FullName', t.email FROM courseinfo as c inner join teacher as t on c.teacher_id = t.id inner join typecourses as tc on c.typecourses_id = tc.id"
  );
  console.log(query);
  res.render("partial/coursesInfo", { result: query });
});

module.exports = router;
