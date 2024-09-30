const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#inputPass');
const eyeIcon = document.querySelector('#eyeIcon');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute('type', type);

    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
});
