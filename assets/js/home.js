// load card project
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

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

  // Menghitung durasi proyek
  const duration = calcDuration(new Date(startDate), new Date(endDate));

  function calcDuration(startDate, endDate) {
    const calcTime = Math.abs(endDate - startDate);
    const calcDays = Math.ceil(calcTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(calcDays / 30);
    const days = calcDays % 30;
    return `${months} month(s) ${days} days{s}`;
  }

  // Menghapus card project post
  const deleteButtons = addProjectPost.querySelectorAll("#buttonDelete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".card").remove();
    });
  });
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);
