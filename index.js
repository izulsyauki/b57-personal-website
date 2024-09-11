const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 5000;
const { calcProjectDuration } = require("./assets/js/utils");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // data untuk parsing objek

const dataProjects = [
  {
    id: Date.now(),
    inputTitle: "Portofolio Project",
    description: "This the firts time portofolio project from me",
    technologies: ["Express.JS", "Node.JS"],
    image: "/assets/images/coding1.jpg",
  },
  {
    id: Date.now(),
    inputTitle: "Web Travel Project",
    description: "In 2024 i have to join with my friend to handle this project",
    technologies: ["Laravel"],
    image: "/assets/images/coding2.webp",
  },
];

// Routing html
app.get("/", home);
app.get("/add-project", addProject);
app.post("/add-project", addProjectPost);
app.get("/edit-project/:id", editProjectView);
app.post("/edit-project/:id", editProject);
app.get("/delete-project/:id", deleteProject);
app.get("/detail-project/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimoni", testimoni);

function home(req, res) {
  res.render("index", { dataProjects });
}

function addProject(req, res) {
  res.render("add-project");
}

function addProjectPost(req, res) {
  // mengambil data dari form
  const { inputTitle, startDate, endDate, technologies, description } =
    req.body;

  const data = {
    id: Date.now(),
    inputTitle,
    startDate,
    endDate,
    duration: calcProjectDuration(startDate, endDate),
    description,
    technologies,
    image: "/assets/images/coding1.jpg",
  };

  dataProjects.unshift(data);
  res.redirect("/");
}

function editProjectView(req, res) {
  const id = parseInt(req.params.id, 10); // mengambil id dari parameter URL

  // find projek berdasarkan id
  const project = dataProjects.find((project) => project.id === id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("edit-project", { project });
}

function editProject(req, res) {
  const { inputTitle, startDate, endDate, technologies, description } =
    req.body;
  const id = parseInt(req.params.id, 10);

  // mencari data berdasarkan index
  const index = dataProjects.findIndex((project) => project.id === id);

  if (index !== -1) {
    const updateData = {
      ...dataProjects[index], // membuat agar id tetap sama
      inputTitle,
      duration: calcProjectDuration(startDate, endDate),
      description,
      technologies,
    };

    dataProjects[index] = updateData;
    res.redirect("/");
  } else {
    res.status(404).send('Project not found')
  }
}

function deleteProject(req, res) {
  const id = parseInt(req.params.id, 10);
  // mencari data berdasarkan index
  const index = dataProjects.findIndex((project) => project.id === id);

  if (index !== -1){
    dataProjects.splice(index, 1);
    res.redirect("/");
  } else {
    res.status(404).send('Project not found')
  }
}

function detailProject(req, res) {
  const id = parseInt(req.params.id, 10);
  const project = dataProjects.find((project) => project.id === id);

  if (project){
    res.render("detail-project", { project });
  } else {
    res.status(404).send('Project not found')
  }
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
