// shop.js
import { products } from "./products.js";
import { laggTillIKundvagn, hamtaKundvagn, tomKundvagn } from "./cartStorage.js";

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearButton = document.getElementById("clear-cart");

// Start
if (productGrid) {
  visaProdukter();
}
visaKundvagn();
clearKundVagn();


function visaProdukter() {
  productGrid.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const kort = skapaProduktKort(product);
    productGrid.appendChild(kort);
  }
}

function skapaProduktKort(product) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const desc = document.createElement("p");
  desc.textContent = product.description;

  const price = document.createElement("p");
  price.textContent = product.price + " kr";
  price.classList.add("price");

  const category = document.createElement("p");
  category.textContent = product.category;
  category.classList.add("category");

  const button = document.createElement("button");
  button.textContent = "Lägg i kundvagn";

  button.addEventListener("click", function () {
    laggTillIKundvagn(product);
    visaKundvagn();
  });

  article.append(img, title, desc, price, category, button);
  return article;
}


function visaKundvagn() {
  if (!cartItems || !cartTotal) return;

  const kundvagnLista = hamtaKundvagn();

  cartItems.innerHTML = "";

  if (kundvagnLista.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Kundvagnen är tom.";
    cartItems.appendChild(p);

    cartTotal.textContent = "0";
    return;
  }

  let total = 0;

  for (let i = 0; i < kundvagnLista.length; i++) {
    const item = kundvagnLista[i];

    const rad = document.createElement("div");
    rad.classList.add("cart-row");

    const namn = document.createElement("span");
    namn.textContent = item.name;

    const antal = document.createElement("span");
    antal.textContent = "x" + item.quantity;

    const radSumma = item.price * item.quantity;

    const summa = document.createElement("span");
    summa.textContent = radSumma + " kr";

    total = total + radSumma;

    rad.append(namn, antal, summa);
    cartItems.appendChild(rad);
  }

  cartTotal.textContent = String(total);
}


function clearKundVagn() {
  if (!clearButton) return;

  clearButton.addEventListener("click", function () {
    tomKundvagn();
    visaKundvagn();
  });
}
