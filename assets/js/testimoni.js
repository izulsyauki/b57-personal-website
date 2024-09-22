// Testimoni AJAX

function getTestimoniData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onerror = () => {
      reject("Network Error");
    };

    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };

    xhr.send();
  });
}

async function getAllTesti() {
  const testimonis = await getTestimoniData(
    "https://api.npoint.io/6ae7a4db8e5a4995d112"
  );

  const testimoniHTML = testimonis.map((testimoni) => {
    return `<div class="card shadow align-self-center" style="width: 18rem">
          <img
            src="${testimoni.image}"
            class="card-img-top"
            alt="person"
          />

          <div class="card-body">
            <h3 class="card-title">
            ${testimoni.client}
              <hr />
            </h3>

            <p class="card-desc align-items-start" id="description">
            ${testimoni.description}
            </p>

            <div class="d-flex justify-content-end h-auto">
              <p class="card-text">
              ${testimoni.rating}
                <i class="bi bi-heart-fill text-danger"></i>
              </p>
            </div>
          </div>
        </div>`;
  });

  document.getElementById("testimoni-post").innerHTML = testimoniHTML.join("");
}

getAllTesti();

async function getTestiByRating(rating) {
  const testimonis = await getTestimoniData(
    "https://api.npoint.io/6ae7a4db8e5a4995d112"
  );

  const filteredTestimonis = testimonis.filter((testimoni) => {
    if (Math.floor(testimoni.rating) == rating) {
      return true;
    }
  });

  const testimoniHTML = filteredTestimonis.map((testimoni) => {
    return `<div class="card shadow" style="width: 18rem">
          <img
            src="${testimoni.image}"
            class="card-img-top"
            alt="person"
          />

          <div class="card-body">
            <h3 class="card-title">
            ${testimoni.client}
              <hr />
            </h3>

            <p class="card-desc align-items-start" id="description">
            ${testimoni.description}
            </p>

            <div class="d-flex justify-content-end h-auto">
              <p class="card-text">
              ${testimoni.rating}
                <i class="bi bi-heart-fill text-danger"></i>
              </p>
            </div>
          </div>
        </div>`;
  });

  document.getElementById("testimoni-post").innerHTML = testimoniHTML.join("");
}

const buttonRatings = [
  {
    key: "All",
    rating: "all",
  },
  {
    key: "1",
    rating: 1,
  },
  {
    key: "2",
    rating: 2,
  },
  {
    key: "3",
    rating: 3,
  },
  {
    key: "4",
    rating: 4,
  },
  {
    key: "5",
    rating: 5,
  },
];

function showButtonRatings() {
  const buttonRatingsHTML = buttonRatings.map((buttonRating) => {
    if (buttonRating.key === "All") {
      return `<button onclick="getAllTesti()"
            class="badge border border-secondary border-1 text-bg-secondary"
          >
            ${buttonRating.key} <i class="bi bi-heart-fill text-danger"></i>
          </button>`;
    } else {
      return `<button onclick="getTestiByRating(${buttonRating.rating})"
            class="badge border border-secondary border-1 text-bg-secondary"
          >
            ${buttonRating.key} <i class="bi bi-heart-fill text-danger"></i>
          </button>`;
    }
  });

  document.getElementById("filterRating").innerHTML =
    buttonRatingsHTML.join("");
}

showButtonRatings();

// ==========================
