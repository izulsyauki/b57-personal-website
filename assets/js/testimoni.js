// OOP Testimoni

// class Testimoni {
//     image = "";
//     client = "";
//     description = "";
//     rating = "";

//     constructor(image, client, description, rating) {
//       this.image = image;
//       this.client = client;
//       this.description = description;
//       this.rating = rating;
//     }

//     getHTML() {
//       return `<div class="testimoni-card">
//             <img
//               src="${this.image}"
//               alt="person"
//             />

//             <div class="testimoni-content">
//               <div class="client">
//                 <h1>${this.client}</h1>
//               </div>
//               <hr />
//               <p id="description">
//               ${this.description}
//               </p>

//               <div class="rating">
//                 <p>${this.rating}</p> <i class="bx bxs-heart"></i>
//               </div>
//             </div>

//           </div>`;
//     }
//   }

//   document.addEventListener("DOMContentLoaded", function () {
//     const testimoni1 = new Testimoni(
//       "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "Tommy",
//       "I love work with Izul, he so professional and fun",
//       4.9
//     );

//     const testimoni2 = new Testimoni(
//       "https://images.pexels.com/photos/914931/pexels-photo-914931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "Emily",
//       "Is very impressive the web that i want really amazing and interactive",
//       4.9
//     );

//     const testimoni3 = new Testimoni(
//       "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "Chris",
//       "Incredible the result it was more than my expectations",
//       4.9
//     );

//     const testimonis = [testimoni1, testimoni2, testimoni3];

//     let testimoniHTML = ``;

//     for (let x = 0; x < testimonis.length; x++) {
//       testimoniHTML += testimonis[x].getHTML();
//     }

//     document.getElementById("testimoni-post").innerHTML = testimoniHTML;
//   });

// ============================================== //

// Testimoni HOF

// const testimonis = [
//   {
//     image:
//       "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     client: "Tommy",
//     description: "I love work with Izul, he so professional and fun",
//     rating: 4.7,
//   },
//   {
//     image:
//       "https://images.pexels.com/photos/914931/pexels-photo-914931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     client: "Emily",
//     description:
//       "Is very impressive the web that i want really amazing and interactive",
//     rating: 5.0,
//   },
//   {
//     image:
//       "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     client: "Evans",
//     description: "Incredible the result it was more than my expectations",
//     rating: 4.5,
//   },
// ];

// HOf dan callback function

// function main(param1,param2, callBack, callback1){ 
//   console.log(param1, param2) 
//   callBack()  // function main mengeksekusi parameter callBack yang mengandung value dari function myCallback 
//  callback1()
// }

  // function callback1(){
  //   console.log("ini callback1")
  // }

// function myCallback(){ 
//   console.log ('hello callback')
// }

// // function myCallback di passing kedalam function main sebagai argument saat proses invocation
// main(1,2,myCallback,callback1)

// /* ===================
// Output :
//  1 2
//  hello callback
// ini callback1
// */

// contoh promise 

// let janji = "bernyanyi"

// let p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if (janji === "bernyanyi") {
//             resolve("Penonton senang")
//         }  else {
//             reject("Anda tidak bernyanyi")
//         }
//     }, 2000)
// })

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
    "https://api.npoint.io/3a1f7544e431b35bd2ec"
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
    "https://api.npoint.io/3a1f7544e431b35bd2ec"
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
