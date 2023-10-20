const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "files");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.filename}`);
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "files2");
  },
  filename: function (req, file, callback) {
    callback(null, "a.pdf");
  },
});

const fs = require("fs");
const upload = multer({
  storage: storage,
});

const download = multer({
  storage: storage2,
});

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

router.get("/files", upload.single("file"), (req, res) => {
  res.render("partial/UploadFile");
});

router.post("/files", upload.single("file"), async (req, res) => {
  const file_name = req.file.originalname;
  await pool.query("Insert Into file SET ?", [{ file_name }]);
  res.redirect("/");
});

module.exports = router;
