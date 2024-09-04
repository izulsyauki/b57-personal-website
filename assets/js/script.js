// OOP Testimoni

class Testimoni {
  image = "";
  client = "";
  description = "";
  rating = "";

  constructor(image, client, description, rating) {
    this.image = image;
    this.client = client;
    this.description = description;
    this.rating = rating;
  }

  getHTML() {
    return `<div class="testimoni-card">
          <img
            src="${this.image}"
            alt="person"
          />

          <div class="testimoni-content">
            <div class="client">
              <h1>${this.client}</h1>
            </div>
            <hr />
            <p id="description">
            ${this.description}
            </p>

            <div class="rating">
              <p>${this.rating}</p> <i class="bx bxs-heart"></i>
            </div>
          </div>

        </div>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const testimoni1 = new Testimoni(
    "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Tommy",
    "I love work with Izul, he so professional and fun",
    4.9
  );

  const testimoni2 = new Testimoni(
    "https://images.pexels.com/photos/914931/pexels-photo-914931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Emily",
    "Is very impressive the web that i want really amazing and interactive",
    4.9
  );

  const testimoni3 = new Testimoni(
    "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Chris",
    "Incredible the result it was more than my expectations",
    4.9
  );

  const testimonis = [testimoni1, testimoni2, testimoni3];

  let testimoniHTML = ``;

  for (let x = 0; x < testimonis.length; x++) {
    testimoniHTML += testimonis[x].getHTML();
  }

  document.getElementById("testimoni-post").innerHTML = testimoniHTML;
});

// function send email

const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", (event) => {
  textarea.style.height = "102px";
  let scHeight = event.target.scrollHeight;
  textarea.style.height = `${scHeight}px`;
});

function sendEmail(event) {
  event.preventDefault();
  const myEmail = "izulsyaukiimani@gmail.com";

  const inputName = document.getElementById("fullname").value;
  const inputEmail = document.getElementById("email").value;
  const inputPhone = document.getElementById("phone-number").value;
  const inputRole = document.getElementById("role").value;
  const inputMsg = document.getElementById("message").value;

  const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
    inputRole
  )}&body=${encodeURIComponent(
    `Name: ${inputName}\nPhone Number: ${inputPhone}\nMessage: ${inputMsg}`
  )}`;

  window.location.href = mailtoLink;

  alert("Success to input your data, and now continue with mail");

  const contact = {
    name: inputName,
    email: inputEmail,
    phoneNumber: inputPhone,
    subject: inputRole,
    message: inputMsg,
  };

  console.log(contact);
}

// Change name label
document.getElementById("upload-img").addEventListener("change", function () {
  const fileName = this.files[0].name; // Mengambil nama file yang diunggah
  const label = document.getElementById("upload-label");
  label.textContent = fileName; // Mengubah teks label menjadi nama file
});

// Adding project

function addProject(event) {
  event.preventDefault();

  const title = document.getElementById("input-title").value;
  const startDate = document.getElementById("input-start-date").value;
  const endDate = document.getElementById("input-end-date").value;
  const description = document.getElementById("input-description").value;

  // Mengecek start date harus lebih besar dari end date
  if (new Date(endDate) < new Date(startDate)) {
    alert("End Date harus lebih besar dari Start Date!");
    return;
  }

  // Menghitung durasi proyek
  const duration = calcDuration(new Date(startDate), new Date(endDate));

  // Mengambil nilai cekbox
  const tech = [];
  for (let i = 1; i <= 6; i++) {
    const checkbox = document.getElementById(`stack${i}`);
    if (checkbox.checked) {
      tech.push(checkbox.nextElementSibling.textContent);
    }
  }

  // Mengambil gambar yang di upload
  const imgFile = document.getElementById("upload-img").files[0];
  const imgURL = URL.createObjectURL(imgFile);

  const addProjectPost = document.querySelector(".project-post");
  const newProjectPost = `
        <div class="project-card">
          <img
            src="${imgURL}"
            alt=""
          />
  
          <div class="project-content">
            <div class="title">
            <h1>${title}</h1>
            <p>Duration: ${duration}</p>
            </div>

            <p id="description">
              ${description}
            </p>
          </div>

          <div class="stack-label">
            ${tech.map((tech) => `<label>${tech}</label>`).join("")}
          </div>
  
          <div class="btn-prj">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </div>
        </div>
        `;

  // Add project card baru ke dalam div project post
  addProjectPost.insertAdjacentHTML("afterbegin", newProjectPost);

  // // Menghapus card project post
  const deleteButtons = addProjectPost.querySelectorAll(".btn-prj .delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.parentElement.remove();
    });
  });

  // Mengosongkan form setelah submit
  document.querySelector("form").reset();
  document.getElementById("upload-img").value = "";
}

function calcDuration(startDate, endDate) {
  const calcTime = Math.abs(endDate - startDate);
  const calcDays = Math.ceil(calcTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(calcDays / 30);
  const days = calcDays % 30;
  return `${months} month(s) ${days} days{s}`;
}

// Fungsi hamburger menu navbar

function showNav() {
  let navbar = document.getElementById("navbar");
  if (navbar.style.display === "block") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }

  console.log("Navbar display toggled to:", navbar.style.display);
}
