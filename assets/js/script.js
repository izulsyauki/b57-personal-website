// function send email

const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", (event) => {
  textarea.style.height = "100px";
  let scHeight = event.target.scrollHeight;
  textarea.style.height = `${scHeight}px`;
});

function sendEmail(event) {
  event.preventDefault();
  const myEmail = "izulsyaukiimani@gmail.com";

  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputRole = document.getElementById("selectRole").value;
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
  document.querySelector("form").reset();
}

// Change name label
// document.getElementById("upload-img").addEventListener("change", function () {
//   const fileName = this.files[0].name; // Mengambil nama file yang diunggah
//   const label = document.getElementById("upload-label");
//   label.textContent = fileName; // Mengubah teks label menjadi nama file
// });

// Adding project

function addProject(event) {
  event.preventDefault();

  const title = document.getElementById("inputTitle").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

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
    const checkbox = document.getElementById(`form-stack-${i}`);
    if (checkbox.checked) {
      tech.push(checkbox.nextElementSibling.textContent);
    }
  }

  // Mengambil gambar yang di upload
  const imgFile = document.getElementById("formFile").files[0];
  const imgURL = URL.createObjectURL(imgFile);

  const addProjectPost = document.getElementById("myPojects");
  const newProjectPost = `
        <div class="card shadow" style="width: 18rem">
          <img
            src="${imgURL}"
            class="card-img-top object-fit-cover"
            alt=""
          />

          <div class="card-body d-flex flex-column justify-content-between" style="height: 320px">
            <h4 class="card-title">${title}</h4>
            <p class="card-text mt-0 mb-3 text-start text-secondary">Duration: ${duration}</p>
            <p class="card-desc align-items-start overflow-y-hidden"  id="description">
            ${description}
            </p>

            <div class="d-flex gap-2 mt-1 mb-3">
            ${tech
              .map(
                (tech) => `<span 
                class="badge border border-secondary border-1 text-secondary"
                >${tech}</span
              >`
              )
              .join("")}
            </div>

            <div class="d-flex gap-2 align-content-end">
              <button class="btn btn-outline-dark w-50">Edit</button>
              <button class="btn btn-dark w-50" id="buttonDelete">Delete</button>
            </div>
          </div>
        </div>
        `;

  // Add project card baru ke dalam div project post
  addProjectPost.insertAdjacentHTML("afterbegin", newProjectPost);

  // // Menghapus card project post
  const deleteButtons = addProjectPost.querySelectorAll("#buttonDelete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".card").remove();
    });
  });

  // Mengosongkan form setelah submit
  document.querySelector("form").reset();
  document.getElementById("formFile").value = "";
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