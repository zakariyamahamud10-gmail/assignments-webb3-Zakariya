import { createNav } from "../../js/nav.js";
import { fetchHouses, scareLevelText } from "./utils.js";
import { Booking } from "./booking.js";

createNav("assignments4");

const content = document.getElementById("content");

const errorBox = document.getElementById("error-box");

const houseImage = document.getElementById("house-image");

const houseName = document.getElementById("house-name");
const houseLocation = document.getElementById("house-location");
const houseDescription = document.getElementById("house-description");
const housePrice = document.getElementById("house-price");
const houseScare = document.getElementById("house-scare");
const houseWifi = document.getElementById("house-wifi");
const houseGhosts = document.getElementById("house-ghosts");
const form = document.getElementById("booking-form");

const checkInInput = document.getElementById("check-in");

const daysInput = document.getElementById("days");
const discountInput = document.getElementById("discount-code");

const totalDisplay = document.getElementById("total-price");
const errorsDisplay = document.getElementById("form-errors");


const confirmation = document.getElementById("confirmation");
const weatherSection = document.getElementById("weather-section");

function showError(msg) {
  errorBox.innerHTML = msg + ' <a href="index.html">Tillbaka till alla hus</a>';
  errorBox.style.display = "block";
  content.style.display = "none";
  console.log("fel på house sidan:", msg);
}

async function fetchWeather(lat, lng) {
  try {
    console.log("hämtar väder för:", lat, lng);

    const params = new URLSearchParams({
      latitude: lat,
      longitude: lng,
      current_weather: true,
      wind_speed_unit: "ms"
    });
    const response = await fetch("https://api.open-meteo.com/v1/forecast?" + params);
    if (!response.ok) {
      throw new Error("Vädret kunde inte hämtas");
    }
    const data = await response.json();
    const w = data.current_weather;

    function weatherDesc(code) {
      if (code === 0) {
        return "Klart";
      }

      if (code <= 3) {
        return "Delvis molnigt";
      }

      if (code <= 48) {
        return "Dimma";
      }

      if (code <= 67) {
        return "Regn";
      }

      if (code <= 77) {
        return "Snö";
      }

      if (code <= 82) {
        return "Skurar";
      }

      return "Åska";
    }

    weatherSection.innerHTML = `
      <h3>Aktuellt väder på platsen</h3>
      <p>Temperatur: <strong>${w.temperature}°C</strong></p>
      <p>Vindhastighet: <strong>${w.windspeed} m/s</strong></p>
      <p>Väder: <strong>${weatherDesc(w.weathercode)}</strong></p>
    `;
    console.log("väder hämtat klart");
  } catch (error) {
    weatherSection.innerHTML = "<p class=\"error\">Kunde inte hämta väderdata.</p>";
    console.log("väder fel", error);
  }
}

function setupBooking(house) {
  const booking = new Booking(house);

  // idag ska vara minsta datm
  const today = new Date().toISOString().split("T")[0];
  checkInInput.min = today;

  function updatePrice() {
    // läsa av allt igen varje gång, lite enklare ba
    booking.checkIn = checkInInput.value;
    booking.days = Number(daysInput.value) || 1;
    booking.discountCode = discountInput.value;

    const checkedBoxes = form.querySelectorAll("input[name=\"addon\"]:checked");
    booking.addons = [];
    for (const cb of checkedBoxes) {
      booking.addons.push(cb.value);
    }

    const price = booking.calculatePrice();
    let discountNote = "";
    if (booking.hasDiscount()) {
      discountNote = " <span class=\"discount-note\">(20% rabatt!)</span>";
    }
    totalDisplay.innerHTML = "Totalt: <strong>" + price + " kr</strong>" + discountNote;
    console.log("pris uppdaterat:", price);
  }

  form.addEventListener("input", updatePrice);
  form.addEventListener("change", updatePrice);
  updatePrice();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    booking.checkIn = checkInInput.value;
    booking.days = Number(daysInput.value);
    booking.discountCode = discountInput.value;

    const checkedBoxes = form.querySelectorAll("input[name=\"addon\"]:checked");
    booking.addons = [];
    for (const cb of checkedBoxes) {
      booking.addons.push(cb.value);
    }

    const errors = booking.validate();

    if (errors.length > 0) {
      let errorHTML = "";

      for (const err of errors) {
        errorHTML += "<p>" + err + "</p>";
      }

      errorsDisplay.innerHTML = errorHTML;
      errorsDisplay.style.display = "block";
      confirmation.style.display = "none";
      return;
    }

    errorsDisplay.style.display = "none";
    console.log("bokning ser okej ut, visar bekräftelse");
    confirmation.innerHTML = booking.confirmationHTML();
    confirmation.style.display = "block";
    confirmation.scrollIntoView({ behavior: "smooth" });
  });
}

function renderHouse(house) {
  houseImage.src = "images/" + house.image;
  houseImage.alt = house.name;

  houseName.textContent = house.name;
  houseLocation.textContent = house.location;
  houseDescription.textContent = house.description;
  housePrice.textContent = house.pricePerNight + " kr/natt";
  houseScare.textContent = scareLevelText(house.scareLevel);
  houseWifi.textContent = house.hasWifi ? "Wifi finns" : "Ingen Wifi";

  const ghostNames = [];
  for (const g of house.ghostTypes) {
    ghostNames.push(g.charAt(0).toUpperCase() + g.slice(1));
  }
  houseGhosts.textContent = ghostNames.join(", ");

  document.title = house.name + " - Spökhusbyrån";
  console.log("renderar hus:", house.name);
}

async function start() {
  try {
    console.log("startar house sidan...");
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    console.log("id från url:", id);

    if (!id) {
      showError("Inget hus-id angivet.");
      return;
    }

    const houses = await fetchHouses();
    console.log("alla hus laddade:", houses.length);

    const house = houses.find((h) => {
      return h.id === id;
    });

    if (!house) {
      showError("Huset hittades inte.");
      return;
    }

    renderHouse(house);
    setupBooking(house);
    fetchWeather(house.coordinates.lat, house.coordinates.lng);
    content.style.display = "block";

  } catch (error) {
    showError("Något gick fel. Försök igen senare.");
    console.log("house sidan kraschade");
    console.log(error);
  }
}

start();
