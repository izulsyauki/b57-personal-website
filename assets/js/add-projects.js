// // Adding project using javascript
// document
//   .getElementById("projectForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Mengambil nilai form
//     const title = document.getElementById("inputTitle").value;
//     const startDate = document.getElementById("startDate").value;
//     const endDate = document.getElementById("endDate").value;
//     const description = document.getElementById("description").value;

//     // Mengecek start date harus lebih besar dari end date
//     if (new Date(endDate) < new Date(startDate)) {
//       alert("End Date harus lebih besar dari Start Date!");
//       return;
//     }

//     // Mengambil nilai cekbox
//     const tech = [];
//     for (let i = 1; i <= 6; i++) {
//       const checkbox = document.getElementById(`form-stack-${i}`);
//       if (checkbox.checked) {
//         tech.push(checkbox.nextElementSibling.textContent);
//       }
//     }

//     // Mengambil gambar yang di upload
//     const imgFile = document.getElementById("formFile").files[0];
//     const imgURL = URL.createObjectURL(imgFile);

//     // Buat objek proyek
//     const project = {
//       id: Date.now(),
//       title,
//       startDate,
//       endDate,
//       description,
//       tech,
//       imgURL,
//     };

//     // Menyimpan ke local storage
//     const projects = JSON.parse(localStorage.getItem("projects")) || [];
//     projects.unshift(project);
//     localStorage.setItem("projects", JSON.stringify(projects));

//     // Mengosongkan form setelah submit
//     document.querySelector("form").reset();
//     document.getElementById("formFile").value = "";

//     // Redirect ke index.html
//     window.location.href = "index.hbs";
//   });

// menampilkan preview gambar
document.getElementById("uploadImage").addEventListener("change", function () {
  const file = document.getElementById("uploadImage").files[0];
  const preview = document.getElementById("imagePreview");

  if (file) {
    const previewURL = URL.createObjectURL(file);

    preview.src = previewURL;
    preview.style.display = "block";

    preview.onload = function () {
      URL.revokeObjectURL(previewURL);
    };
  } else {
    preview.style.display = "none";
  }
});
