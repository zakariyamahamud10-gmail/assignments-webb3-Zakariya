import { products } from "./products.js";
import { addToCart } from "./cart.js";

const productGrid = document.getElementById("product-grid");

if (!productGrid) {
  console.log("ingen productGrid");
} else {
  console.log("produkter finns", products);
  renderProducts(products);
}

function renderProducts(list) {
  productGrid.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    const product = list[i];
    const card = createProductCard(product);
    productGrid.appendChild(card);
  }
}

function createProductCard(product) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const desc = document.createElement("p");
  desc.textContent = product.description;

  const price = document.createElement("p");
  price.textContent = `${product.price} kr`;
  price.classList.add("price");

  const category = document.createElement("p");
  category.textContent = product.category;
  category.classList.add("category");

  const button = document.createElement("button");
  button.textContent = "Lägg i kundvagn";

  button.addEventListener("click", function() {
    addToCart(product)
    console.log("klick på:", product.id);
  });

  article.append(img, title, desc, price, category, button);
  return article;
}
