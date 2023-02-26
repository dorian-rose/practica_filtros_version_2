//document site variables

const viajes = document.querySelector(".viajes");
const select = document.querySelector("select");
const fragment = document.createDocumentFragment();
const relatedContentDiv = document.querySelector("#related-content-div");
console.log(relatedContentDiv);
const close = document.querySelector(".close");
const filterContainer = document.querySelector("#filter-container");
const searchResultDiv = document.querySelector("#search-result-div");
const filteredTrips = document.querySelector(".filtered-trips");
const primaryTrip = document.querySelector(".primary-trip");
const secondaryTrips = document.querySelector(".secondary-trips");

//arrays for card content
let filteredImages = [];
const travelImages = [
  {
    url: "viajes-1.jpg",
    text: "hammock on the beach",
    relatedWords: ["mar", "agua", "cielo"],
  },
  {
    url: "viajes-2.jpg",
    text: "beach huts",
    relatedWords: ["mar", "agua", "cielo", "edificios", "nubes"],
  },
  {
    url: "viajes-3.jpg",
    text: "signs",
    heading: "Trip 3",
    relatedWords: ["nubes", "cielo"],
  },
  {
    url: "viajes-4.jpg",
    text: "Seville",
    relatedWords: [
      "seville",
      "agua",
      "cielo",
      "edificios",
      "ciudad",
      "puentes",
    ],
  },
  {
    url: "viajes-5.jpg",
    text: "bridge in Seville",
    relatedWords: [
      "seville",
      "agua",
      "cielo",
      "edificios",
      "ciudad",
      "puentes",
      "farolas",
    ],
  },
  {
    url: "viajes-6.jpg",
    text: "seaside road",
    heading: "Trip 6",
    relatedWords: ["mar", "agua", "cielo", "puentes", "farolas", "nubes"],
  },
  {
    url: "viajes-7.jpg",
    text: "Granada",
    relatedWords: ["cielo", "edificios", "ciudad"],
  },
];

//array related words
const relatedWords = [
  "farolas",
  "nubes",
  "mar",
  "agua",
  "edificios",
  "ciudad",
  "puentes",
  "seville",
  "kangaroo",
  "todos",
];

//event listeners:
document.addEventListener("click", ({ target }) => {
  if (target.matches(".filter")) {
    const id = target.id;
    filter(id);
  }
});
filteredTrips.addEventListener("click", ({ target }) => {
  if (target.matches(".card")) {
    makeFilteredCards(target);
  }
});
//====FUNCTIONS=====

//filter images
const filter = (id) => {
  viajes.innerHTML = "";
  primaryTrip.innerHTML = "";
  secondaryTrips.innerHTML = "";
  searchResultDiv.innerHTML = "";
  relatedContentDiv.innerHTML = "";
  filteredImages = [];
  if (id == "todos") {
    makeCard(travelImages);
  } else {
    travelImages.forEach((element) => {
      element.relatedWords.forEach((word) => {
        if (word == id) {
          filteredImages.push(element);
        }
      });
    });
    filteredResults(id);
  }
};

//sort and initialize actions based on filter results
const filteredResults = (id) => {
  if (filteredImages.length > 0) {
    const searchResult = document.createElement("P");
    searchResult.innerHTML = `Aqui un imagen de <strong>${id}</strong>`;
    searchResultDiv.append(searchResult);
    const relatedContent = document.createElement("P");
    relatedContent.innerHTML = `Resultados parecidos: <strong>${
      filteredImages.length - 1
    }</strong> otros imagenes relacionados con <strong>${id}</strong>`;
    relatedContentDiv.append(relatedContent);
    let target = { alt: filteredImages[0].text };
    makeFilteredCards(target);
  } else {
    let searchResult = document.createElement("P");
    searchResult.innerHTML = `Su busqueda no ha encontrado ningun imagen de <strong>${id}</strong>`;
    searchResultDiv.append(searchResult);
  }
};

const makeFilteredCards = (target) => {
  primaryTrip.innerHTML = "";
  secondaryTrips.innerHTML = "";
  const primaryImage = filteredImages.find((item) => item.text == target.alt);
  filteredImages.forEach((item) => {
    if (item != primaryImage) {
      const secondaryImg = document.createElement("IMG");
      secondaryImg.alt = item.text;
      secondaryImg.src = `viajes/${item.url}`;
      secondaryImg.title = item.text;
      secondaryImg.classList.add("card");
      fragment.append(secondaryImg);
    } else {
      primaryTrip.innerHTML = "";
      const primaryImg = document.createElement("IMG");
      primaryImg.alt = item.text;
      primaryImg.src = `viajes/${item.url}`;
      primaryImg.title = item.text;
      primaryTrip.append(primaryImg);
    }
  });
  secondaryTrips.append(fragment);
};

//make  buttons for filter options
const makeFilterButtons = () => {
  const filterTitle = document.createElement("H4");
  filterTitle.textContent = "Filtrar por:";
  relatedWords.forEach((word) => {
    const filterButton = document.createElement("BUTTON");
    filterButton.textContent = word;
    filterButton.setAttribute("id", word);
    filterButton.classList.add("filter");
    fragment.append(filterButton);
  });
  filterContainer.append(filterTitle, fragment);
};

//paint original photo cards
function makeCard(imageArray) {
  imageArray.forEach((item) => {
    //create image
    const cardImg = document.createElement("IMG");
    cardImg.alt = item.text;
    cardImg.src = `viajes/${item.url}`;
    cardImg.title = item.text;
    //store (attache) card container to fragment
    fragment.append(cardImg);
  });
  viajes.append(fragment);
}

// start: call functions on document load
document.addEventListener("DOMContentLoaded", () => {
  makeFilterButtons();
  makeCard(travelImages);
});
