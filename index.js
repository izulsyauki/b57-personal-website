const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 5000;
const { calcProjectDuration } = require("./assets/js/utils");

// setting sequelize
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

// setting middleware
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // data untuk parsing objek
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// const dataProjects = [
//   {
//     id: Date.now(),
//     inputTitle: "Portofolio Project",
//     description: "This the firts time portofolio project from me",
//     technologies: ["Express.JS", "Node.JS"],
//     image: "/assets/images/coding1.jpg",
//   }
// ];

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

async function home(req, res) {
  const query = `SELECT * FROM public.projects`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("index", { result });
}

async function addProject(req, res) {
  res.render("add-project");
}

async function addProjectPost(req, res) {
  // mengambil data dari form
  const { inputTitle, startDate, endDate, technologies, description } =
    req.body;

  const duration = calcProjectDuration(startDate, endDate);

  const query = `INSERT INTO projects (title, "startDate", "endDate", technologies, description, image, duration)VALUES ('${inputTitle}', '${startDate}', '${endDate}', '{${technologies}}', '${description}', 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '${duration}')`;

  const result = await sequelize.query(query, { type: QueryTypes.INSERT });

  // const data = {
  //   id: Date.now(),
  //   inputTitle,
  //   startDate,
  //   endDate,
  //   duration: calcProjectDuration(startDate, endDate),
  //   description,
  //   technologies,
  //   image: "/assets/images/coding1.jpg",
  // };

  // dataProjects.unshift(data);
  res.redirect("/");
}

async function editProjectView(req, res) {
  const { id } = req.params;

  // find projek berdasarkan id
  const query = `SELECT * FROM projects WHERE id=${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });

  const [project] = result;

  if (!project) return res.status(404).send("Project not found");

  res.render("edit-project", { project });
}

async function editProject(req, res) {
  const { id } = req.params;
  const { inputTitle, startDate, endDate, technologies, description } =
    req.body;

  const duration = calcProjectDuration(startDate, endDate);

  const query = `UPDATE projects SET title='${inputTitle}', "startDate"='${startDate}', "endDate"='${endDate}', technologies='{${technologies}}', description='${description}', duration='${duration}'`


  if (!id) return res.status(404).send("Project not found");
  
  const result = await sequelize.query(query, {type: QueryTypes.UPDATE})
  res.redirect("/");
}

async function deleteProject(req, res) {
  const { id } = req.params;
  let query = `SELECT * FROM projects WHERE id=${id}`;
  let result = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!result) return res.status(404).send("Project not found");
  query = `DELETE FROM projects WHERE id=${id}`;
  result = await sequelize.query(query, { type: QueryTypes.DELETE });
  res.redirect("/");
}

async function detailProject(req, res) {
  const { id } = req.params;
  // query select untuk mengambil data dari db
  const query = `SELECT * FROM public.projects WHERE id=${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });

  const [project] = result;

  if (!result) {
    return res.status(404).send("Project not found");
  }

  res.render("detail-project", { project });
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
