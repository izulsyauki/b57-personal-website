const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 5000;
const { calcProjectDuration } = require("./assets/js/utils");
const Project = require("./models").projects;
const User = require("./models").users;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const multer = require("multer");
// setting multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only images file are allowed"));
//   }
// };
const upload = multer({ storage});

// data untuk cekbox
const techData = [
  {
    name: "Node.Js",
    key: "node",
  },
  {
    name: "Express.Js",
    key: "express",
  },
  {
    name: "React.Js",
    key: "react",
  },
  {
    name: "Next.Js",
    key: "next",
  },
  {
    name: "Typescript",
    key: "typescript",
  },
  {
    name: "Others",
    key: "others",
  },
];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // data untuk parsing objek
app.use(
  session({
    name: "my-session",
    secret: "u94eSa7gzu",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);
app.use(flash());
app.use(cookieParser());

// setting helpers
hbs.registerPartials(path.join(__dirname, "views", "partials"));
hbs.registerHelper("isExist", function (array, value) {
  return array.includes(value);
});
hbs.registerHelper("getTechName", function (value) {
  const result = techData.find((tech) => tech.key === value);
  return result ? result.name : "";
});
hbs.registerHelper("formatDate", function (date) {
  return moment(date).format("YYYY-MM-DD");
});

// Routing html
app.get("/", home);
app.get("/add-project", addProjectView);
app.post("/add-project", upload.single('uploadImage'), addProjectPost);
app.get("/edit-project/:id", editProjectView);
app.post("/edit-project/:id", upload.single('uploadImage'), editProject);
app.get("/delete-project/:id", deleteProject);
app.get("/detail-project/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimoni", testimoni);
app.get("/register", registerView);
app.post("/register", register);
app.get("/login", loginView);
app.post("/login", login);
app.get("/logout", logout);

async function home(req, res) {
  try {
    const result = await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
    const user = req.session.user;

    const resultWithUser = result.map((item) => ({
      ...item.dataValues,
      user: user,
    }));

    res.render("index", { result: resultWithUser, user });
  } catch (error) {
    console.log("ini error apa bang?", error);
    req.flash("danger", "Something went wrong");
    res.redirect("/");
  }
}

async function addProjectView(req, res) {
  try {
    const tech = techData;
    const user = req.session.user;
    const messageWarning = req.cookies.warning;
    res.clearCookie("warning");

    if (!user) {
      res.cookie("warning", "You're must login to continue!", {
        httpOnly: true,
        maxAge: 5000,
      });
      return res.redirect("login");
    }

    res.render("add-project", { tech, user, messageWarning });
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.redirect("/");
  }
}

async function addProjectPost(req, res) {
  try {
    const { inputTitle, startDate, endDate, technologies, description } =
      req.body;

    const duration = calcProjectDuration(startDate, endDate);

    await Project.create({
      title: inputTitle,
      startDate: startDate,
      endDate: endDate,
      technologies: technologies,
      description: description,
      image: "/" + req.file.path,
      duration: duration,
      userId: req.session.user.id,
    });

    req.flash("success", "Adding project successful!");
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.redirect("/");
  }
}

async function editProjectView(req, res) {
  try {
    const { id } = req.params;
    const user = req.session.user;

    const result = await Project.findOne({
      where: {
        id: id,
      },
    });

    const tech = techData;

    if (!result) {
      req.flash("error", "Project not found");
      return res.redirect("/", user);
    }

    res.render("edit-project", { result, tech });
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.redirect("/");
  }
}

async function editProject(req, res) {
  try {
    console.log("request file", req.file);
    const { id } = req.params;
    const { inputTitle, startDate, endDate, technologies, description } =
      req.body;

    const duration = calcProjectDuration(startDate, endDate);

    const project = await Project.findOne({
      where: {
        id: id,
      },
    });

    if (!project) {
      req.flash("error", "Project not found");
      return res.redirect("/");
    }

    project.title = inputTitle;
    project.startDate = startDate;
    project.endDate = endDate;
    project.technologies = technologies;
    project.description = description;
    project.image = "/" + req.file.path;
    project.duration = duration;

    await project.save();

    req.flash("success", "Edit successfull!");
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.redirect("/");
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    let result = await Project.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      req.flash("error", "Project not found");
      return res.redirect("/");
    }

    await Project.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.redirect("/");
  }
}

async function detailProject(req, res) {
  try {
    const { id } = req.params;
    const user = req.session.user;

    const result = await Project.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!result) {
      req.flash("error", "Project not found");
      return res.redirect("/");
    }

    console.log("kamu apa bang?", result.image);
    res.render("detail-project", { result, user });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong!");
    return res.redirect("/");
  }
}

function contactMe(req, res) {
  const user = req.session.user;
  res.render("get-in-touch", { user });
}

function testimoni(req, res) {
  const user = req.session.user;
  res.render("testimoni", { user });
}

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await User.create({
      name: name,
      email: email,
      password: hashedPass,
    });

    req.flash("success", "Register Successful!");
    res.redirect("login");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.redirect("register");
  }
}

function loginView(req, res) {
  const messageWarning = req.cookies.warning;
  res.clearCookie("warning");

  res.render("login", { messageWarning });
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      req.flash("error", "Check again youre email or password");
      return res.redirect("/login");
    }

    // menyimpan data user tanpa password ke session
    const userWithoutPass = { ...user.get(), password: undefined };
    req.session.user = userWithoutPass;

    req.flash("success", "Login Successful!");
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/login");
  }
}

function logout(req, res) {
  try {
    res.cookie("warning", "You're Logged out, Please Login to Continue!", {
      httpOnly: true,
      maxAge: 5000,
    });

    req.session.destroy((err) => {
      if (err) {
        req.flash("error", "Logout failed, Try again!");
        return res.redirect("/");
      }

      res.redirect("/login");
    });
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
}

app.listen(port, () => {
  console.log(`Server sedang berjalan di port ${port}`);
});
