import { createNav } from "../../js/nav.js";
import { fetchHouses, scareLevelText } from "./utils.js";

createNav("assignments4");

const container = document.getElementById("houses-container");
const errorBox = document.getElementById("error-box");
const noResults = document.getElementById("no-results");
const maxPriceInput = document.getElementById("max-price");
const maxPriceLabel = document.getElementById("max-price-label");
const scareSlider = document.getElementById("scare-level");
const scareLevelLabel = document.getElementById("scare-level-label");
const ghostSelect = document.getElementById("ghost-type");
const wifiCheckbox = document.getElementById("wifi-only");
const filterForm = document.getElementById("filter-form");

let allHouses = [];

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
  console.log("fel på index sidan:", msg);
}

function displayHouses(houses) {
  container.innerHTML = "";

  noResults.style.display = houses.length === 0 ? "block" : "none";

  for (const house of houses) {
    const card = document.createElement("article");
    card.className = "house-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "house-img";
    imgWrap.innerHTML = `<img src="images/${house.image}" alt="${house.name}">`;

    const info = document.createElement("div");
    info.className = "house-info";

    // ba skriva ut allt här direkt
    info.innerHTML = `
      <h2>${house.name}</h2>
      <p class="location">${house.location}</p>
      <p class="price">${house.pricePerNight} kr/natt</p>
      <p class="scare">${scareLevelText(house.scareLevel)}</p>
      <p class="wifi">${house.hasWifi ? "Wifi finns" : "Ingen Wifi"}</p>
      <a href="house.html?id=${house.id}">Läs mer och boka</a>
    `;

    card.appendChild(imgWrap);
    card.appendChild(info);
    container.append(card);
  }

  console.log("renderar hus:", houses.length);
}

function populateGhostTypes(houses) {
  const types = new Set();

  for (const house of houses) {
    for (const g of house.ghostTypes) {
      types.add(g);
    }
  }

  for (const type of [...types].sort()) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    ghostSelect.append(option);
  }

  console.log("spöktyper i dropdown:", [...types]);
}

function applyFilters() {
  const maxPrice = Number(maxPriceInput.value);
  const minScare = Number(scareSlider.value);
  const ghostType = ghostSelect.value;
  const wifiOnly = wifiCheckbox.checked;

  // uppdatera texten dirket när man drar
  maxPriceLabel.textContent = maxPrice + " kr";

  if (minScare === 0) {
    scareLevelLabel.textContent = "Alla nivåer";
  } else {
    scareLevelLabel.textContent = scareLevelText(minScare);
  }
  const filteredHouses = allHouses.filter((house) => {
    if (house.pricePerNight > maxPrice) {
      return false;
    }

    if (minScare > 0) {
      if (house.scareLevel < minScare) {
        return false;
      }
    }

    if (ghostType !== "all") {
      if (!house.ghostTypes.includes(ghostType)) {
        return false;
      }
    }

    if (wifiOnly) {
      if (!house.hasWifi) {
        return false;
      }
    }

    return true;
  });

  console.log("filter körs", {
    maxPrice,
    minScare,
    ghostType,
    wifiOnly,
    antal: filteredHouses.length
  });

  displayHouses(filteredHouses);
}

async function start() {
  try {
    console.log("startar assignments4 index...");
    allHouses = await fetchHouses();
    console.log("hus hämtade:", allHouses.length);

    const prices = allHouses.map(h => h.pricePerNight);
    const maxPossible = Math.max(...prices);

    maxPriceInput.max = maxPossible;
    maxPriceInput.value = maxPossible;
    maxPriceLabel.textContent = maxPossible + " kr";
    scareLevelLabel.textContent = "Alla nivåer";

    populateGhostTypes(allHouses);
    displayHouses(allHouses);

    filterForm.addEventListener("input", () => {
      applyFilters();
    });

    filterForm.addEventListener("change", () => {
      applyFilters();
    });
    

  } catch (error) {
    showError("Något gick fel när husen hämtades. Försök igen senare.");
    console.log("fel när hus skulle hämtas");
    console.log(error);
  }
}

start();
