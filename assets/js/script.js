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

// fungsi onklik untuk membuka detail project

function detailProject(id) {
  window.location.href = `/detail-project/${id}`;
}

