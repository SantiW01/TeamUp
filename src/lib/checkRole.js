module.exports = {
  beAdmin(req, res, next) {
    if (!req.user) {
      res.status(403);
      return res.send("You need to be admin");
    }
    next();
  },

  beStudent(req, res, next) {
    if (!req.user) {
      res.status(403);
      return res.send("You need to be a student");
    }
    next();
  },

  beTeacher(req, res, next) {
    if (!req.user) {
      res.status(403);
      return res.send("You need to be a teacher");
    }
    next();
  },
};
