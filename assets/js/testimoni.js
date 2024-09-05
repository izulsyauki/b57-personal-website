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

const testimonis = [
  {
    image:
      "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    client: "Tommy",
    description: "I love work with Izul, he so professional and fun",
    rating: 4.7,
  },
  {
    image:
      "https://images.pexels.com/photos/914931/pexels-photo-914931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    client: "Emily",
    description:
      "Is very impressive the web that i want really amazing and interactive",
    rating: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    client: "Evans",
    description: "Incredible the result it was more than my expectations",
    rating: 4.5,
  }
];

function getAllTesti() {
  const testimoniHTML = testimonis.map((testimoni) => {
    return `<div class="testimoni-card">
            <img
              src="${testimoni.image}"
              alt="person"
            />
  
            <div class="testimoni-content">
              <div class="client">
                <h1>${testimoni.client}</h1>
              </div>
              <hr />
              <p id="description">
              ${testimoni.description}
              </p>
  
              <div class="rating">
                <p>${testimoni.rating}</p> <i class="bx bxs-heart"></i>
              </div>
            </div>
  
          </div>`;
  });

  document.getElementById("testimoni-post").innerHTML = testimoniHTML.join("");
}

getAllTesti();

function getTestiByRating(rating){
  const filteredTestimonis = testimonis.filter((testimoni) => {
    if (Math.floor(testimoni.rating) == rating) {
      return true;
    }
  });

  const testimoniHTML = filteredTestimonis.map((testimoni) => {
    return `<div class="testimoni-card">
            <img
              src="${testimoni.image}"
              alt="person"
            />
  
            <div class="testimoni-content">
              <div class="client">
                <h1>${testimoni.client}</h1>
              </div>
              <hr />
              <p id="description">
              ${testimoni.description}
              </p>
  
              <div class="rating">
                <p>${testimoni.rating}</p> <i class="bx bxs-heart"></i>
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
  }
];

function showButtonRatings() {
  const buttonRatingsHTML = buttonRatings.map((buttonRating) => {
    if (buttonRating.key === "All") {
      return `<button onclick="getAllTesti()" class="btn">${buttonRating.key}<i class="bx bxs-heart"></i></button>`;
    } else {
      return `<button onclick="getTestiByRating(${buttonRating.rating})" class="btn">${buttonRating.key}<i class="bx bxs-heart"></i></button>`;
    }
  });

  document.getElementById("button-rating").innerHTML = buttonRatingsHTML.join("");
}

showButtonRatings();