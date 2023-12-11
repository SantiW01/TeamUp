const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");
const MIMETYPES = ["application/pdf"];

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "files");
  },
  filename: function (req, file, callback) {
    if (MIMETYPES.includes(file.mimetype))
      callback(null, `${Date.now()}-${file.originalname}`);
    else callback(new Error(`Only pdf's file are allowed`));
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", upload.single("file"), (req, res) => {
  res.render("partial/UploadFile");
});

router.post("/post", upload.single("file"), async (req, res) => {
  const file_name = req.file.filename;
  await pool.query("Insert Into file SET ?", [{ file_name }]);
  res.redirect("/");
});

router.get("/show", upload.single("file"), async (req, res) => {
  const query = await pool.query("SELECT id, file_name from file");
  res.render("partial/showfiles", { result: query });
});

module.exports = router;
