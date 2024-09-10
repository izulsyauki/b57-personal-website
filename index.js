const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded ({extended: false}));

const projects = [];

// routing
app.get("/", home);
app.get("/add-project", addProject);
app.post("/add-project", addProjectPost);
app.get("/delete-project/:id",deleteProject);
app.get("/detail-project/detail/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimoni", testimoni);

function deleteProject(req, res) {
  const id = req.params.id

  projects.splice(id, 1);
  res.redirect("/project")
}

function home(req, res) {
  res.render("index")
};

function detailProject(req, res) {
  res.render("detail-project")
}

function addProject(req, res) {
  res.render("add-project")
}

function addProjectPost(req,res) {
  // get data from form
  const { inputTitle, startDate, endDate, technologies, description } = req.body;
  
  console.log("title: ", inputTitle);
  console.log("start date: ", startDate);
  console.log("end date: ", endDate);
  console.log("technologies: ", technologies);
  console.log("description: ", description);

  console.log(data)

  res.send("Data dikirim ke terminal, cek youre terminal");
  // projects.unshift(data);

  // res.redirect("/")
}

function contactMe(req, res) {
  res.render("get-in-touch")
}

function testimoni(req, res) {
  res.render("testimoni")
}


app.listen(port, () => {
  console.log(`Server sedang berjalan di port ${port}`)
});


// dynamic routing

// app.get("/detail/:id", (req, res) => {
//   const id = req.params.id // dynamic routing
//   const { name } = req.query // querystring

//   res.send(`Detail ${id}; ${name}`)
// });
