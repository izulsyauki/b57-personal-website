const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 5000;
const { calcProjectDuration } = require("./assets/js/utils");
const Project = require("./models").
	projects;
const User = require("./models").
	users;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');


const techData = [
	{
		name: 'Node.Js',
		key: 'node',
	},
	{
		name: 'Express.Js',
		key: 'express',
	},
	{
		name: 'React.Js',
		key: 'react',
	},
	{
		name: 'Next.Js',
		key: 'next',
	},
	{
		name: 'Typescript',
		key: 'typescript',
	},
	{
		name: 'Others',
		key: 'others',
	}
];


// setting middleware
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // data untuk parsing objek
app.use(session({
	name: 'my-session',
	secret: 'u94eSa7gzu',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	}
})
);
app.use(flash());

hbs.registerPartials(path.join(__dirname, "views", "partials"));
hbs.registerHelper('isExist', function (array, value) {
	return array.includes(value);
});
hbs.registerHelper('getTechName', function (value) {
	const result = techData.find(tech => tech.key === value);
	return result ? result.name : '';
})

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
app.get("/register", registerView);
app.post("/register", register);
app.get("/login", loginView);
app.post("/login", login);


async function home(req, res) {
	const result = await Project.findAll();

	res.render("index", { result });
}

async function addProject(req, res) {
	const tech = techData;
	res.render("add-project", { tech });
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
			image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			duration: duration,
		});

		req.flash("success", "Adding Project Success!");
		res.redirect("/");
	} catch (error) {
		req.flash("error", "Something went wrong!")
		return res.redirect("/");
	}
}

async function editProjectView(req, res) {
	try {
		const { id } = req.params;

		const result = await Project.findOne({
			where: {
				id: id,
			}
		});

		const tech = techData;

		if (!result) {
			req.flash("error", "Project not found");
			return res.redirect("/")
		}

		res.render("edit-project", { result, tech });
	} catch (error) {
		req.flash("error", "Something went wrong!")
		return res.redirect("/");
	}
}




async function editProject(req, res) {
	try {
		const { id } = req.params;
		const { inputTitle, startDate, endDate, technologies, description } =
			req.body;

		const duration = calcProjectDuration(startDate, endDate);

		const project = await Project.findOne({
			where: {
				id: id
			}
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
		project.image = 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
		project.duration = duration;

		await project.save();

		req.flash("success", "Edit Successfull!")
		res.redirect("/");
	} catch (error) {
		req.flash("error", "Something went wrong!")
		return res.redirect("/");
	}
}

async function deleteProject(req, res) {
	try {
		const { id } = req.params;
		let result = await Project.findOne({
			where: {
				id: id
			}
		});

		if (!result) {
			req.flash("error", "Project not found");
			return res.redirect("/");
		}

		await Project.destroy({
			where: {
				id: id
			}
		});
		res.redirect("/");
	} catch (error) {
		req.flash("error", "Something went wrong!")
		return res.redirect("/");
	}
}

async function detailProject(req, res) {
	try {
		const { id } = req.params;
		// query select untuk mengambil data dari db

		const result = await Project.findOne({
			where: {
				id: id,
			}
		});

		if (!result) {
			req.flash("error", "Project not found")
			return res.redirect("/")
		}

		res.render("detail-project", { result });
	} catch (error) {
		req.flash("error", "Something went wrong!")
		return res.redirect("/");
	}

}

function contactMe(req, res) {
	res.render("get-in-touch");
}

function testimoni(req, res) {
	res.render("testimoni");
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
			password: hashedPass
		});

		req.flash("success", "Login succeeded")
		res.redirect("register");
	} catch (error) {
		req.flash("error", "Something went wrong!")
		return res.redirect("register");
	}
}

function loginView(req, res) {
	res.render("login");
}

async function login(req, res) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({
			where: {
				email: email,
			}
		});

		if (!user) {
			req.flash("error", "User not found");
			return res.redirect("/login");
		}

		const isValidPass = await bcrypt.compare(password, user.password)

		if (!isValidPass) {
			req.flash("error", "Check again youre email or password");
			return res.redirect("/login");
		}

		// menyimpan data user tanpa password ke session
		const userWithoutPass = { ...user.get(), password: undefined };
		req.session.user = userWithoutPass

		req.flash("success", "Login succeeded!")
		res.redirect("/");
	} catch (error) {
		req.flash("error", "Something went wrong")
		res.redirect("/login");
	}
}

app.listen(port, () => {
	console.log(`Server sedang berjalan di port ${port}`);
});