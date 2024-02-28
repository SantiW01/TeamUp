const express = require("express");
const router = express.Router();
const pool = require("../database");
router.get("/post", async (req, res) => {
  const teacher = await pool.query(
    "SELECT id, concat(name, ' ', surname) as 'FullName' FROM teacher"
  );
  const typeCourse = await pool.query("SELECT * FROM typecourses");
  res.render("partial/InsertCourses", {
    teacher: teacher,
    courses: typeCourse,
  });
});

router.post("/post", async (req, res) => {
  const { typecourses_id, courseSchedule, teacher_id } = req.body;
  const insertCourses = {
    courseSchedule,
    teacher_id,
    typecourses_id,
  };
  await pool.query("INSERT INTO courseinfo set ? ", [insertCourses]);
  res.redirect("/coursesInformation");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const course = await pool.query("SELECT * FROM typecourses where id = ?", [
    id,
  ]);
  res.render("partial/editCourses", { course: course[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateCourse = {
    description,
  };
  await pool.query(
    "UPDATE typecourses set description = IFNULL(?, description) where id = ? ",
    [updateCourse.description, id]
  );
  res.redirect("/coursesInformation");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    pool.query("DELETE FROM typecourses WHERE id = ?", [id]);
    res.redirect("/coursesInformation");
  } catch {
    res.redirect("/partial/error");
  }
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const query = await pool.query(
    "SELECT concat(s.name, ' ',s.surname) as 'FullName', s.email, tc.description FROM detailcourse as dc inner join student as s on dc.student_id = s.id inner join typecourses as tc on dc.course_id = tc.id where dc.course_id = ?",
    [id]
  );
  console.log(query);
  res.render("partial/courseDetails", { result: query, id: id });
});

router.get("/details/post/newStudent/:id", async (req, res) => {
  const { id } = req.params;
  const query = await pool.query(
    "SELECT concat(name, ' ', surname) as 'FullName', id from student"
  );
  res.render("partial/addStudent", { result: query, idC: id });
});

router.post("/details/post/newStudent/:idC", async (req, res) => {
  const { idC } = req.params;
  const { id } = req.body;
  const insertStudent = {
    id,
  };
  await pool.query(
    "INSERT INTO detailcourse set student_id = ?, course_id = ?",
    [insertStudent.id, idC]
  );
  res.redirect("/courses/details/" + idC);
});

module.exports = router;
