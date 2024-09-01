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

// add 3 dots

// let char = document.getElementById("description");

// function add3Dots(string, limit) {
//   let dots = "...";
//   if (string.length > limit) {
//     string = string.substring(0, limit) + dots;
//   }
  
//   return string;
// }

// add3Dots(string(char), 115);