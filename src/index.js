const express = require("express");
const morgan = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const exphbs = require("express-handlebars");
const { database } = require("./keys");
const helper = require("./Components/helper");
const app = express();
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partial"),
    extname: ".hbs",
  })
);

helper.registerHelper("role", function (value) {
  if (value == 1) {
    return 1;
  }

  if (value == 2) {
    return 2;
  }

  if (value == 3) {
    return 3;
  }
});

app.set("view engine", ".hbs");

app.use(
  session({
    secret: "teamupmysqldatabase",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);

app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use("/courses", require("./routes/CoursesLinks"));
app.use("/degree", require("./routes/degreeLinks"));
app.use("/student", require("./routes/studentLinks"));
app.use("/teacher", require("./routes/teacherLinks"));

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
