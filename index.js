const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dataProjects = [];

// Routing html
app.get("/", home);
app.get("/add-project", addProject);
app.post("/add-project", addProjectPost);
app.get("/delete-project/:id", deleteProject);
app.get("/detail-project/detail/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimoni", testimoni);

function deleteProject(req, res) {
  const id = req.params.id;

  projects.splice(id, 1);
  res.redirect("/project");
}

function home(req, res) {
  res.render("index", {dataProjects});
}

function detailProject(req, res) {
  res.render("detail-project");
}

function addProject(req, res) {
  res.render("add-project");
}

function addProjectPost(req, res) {
  // mengambil data dari form
  const { inputTitle, startDate, endDate, technologies, description } =
    req.body;

  const data = {
    inputTitle,
    startDate,
    endDate,
    description,
    technologies,
    image: "/assets/images/coding1.jpg",
  };

  dataProjects.unshift(data);
  res.redirect("/");
}

function contactMe(req, res) {
  res.render("get-in-touch");
}

function testimoni(req, res) {
  res.render("testimoni");
}

app.listen(port, () => {
  console.log(`Server sedang berjalan di port ${port}`);
});

// dynamic routing

// app.get("/detail/:id", (req, res) => {
//   const id = req.params.id // dynamic routing
//   const { name } = req.query // querystring

//   res.send(`Detail ${id}; ${name}`)
// });
