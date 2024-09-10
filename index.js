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
app.get("/home", home);
app.get("/add-my-project", addMyProject);
app.post("/add-my-project", addMyProjectPost);
app.get("/detail-project/detail/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimoni", testimoni);

function home(req, res) {
  res.render("index")
};

function detailProject(req, res) {
  res.render("detail-project")
}

function addMyProject(req, res) {
  res.render("add-my-project")
}

function addMyProjectPost(req,res) {
  const { inputTitle, description } = req.body;
  
  const data = {
    title: inputTitle,
    starDate: "2024-09-01",
    endDate: "2024-09-30",
    formStack: "",
    description,
    image: ""
  }

  projects.unshift(data);

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
