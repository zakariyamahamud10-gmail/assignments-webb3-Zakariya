const STORAGE_KEY = "u2_cart";

// Kundvagnen (listan) startar från localStorage
let cart = loadCart();

export function laggTillIKundvagn(product) {
  let foundProduct = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      foundProduct = cart[i];
      break;
    }
  }

  if (foundProduct) {
    foundProduct.quantity = foundProduct.quantity + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
}

export function hamtaKundvagn() {
  // Returnera kopia så andra filer inte råkar ändra originalet
  return cart.slice();
}

export function tomKundvagn() {
  cart = [];
  localStorage.removeItem(STORAGE_KEY);
}


function loadCart() {
  const text = localStorage.getItem(STORAGE_KEY);
  if (!text) return [];

  const data = JSON.parse(text);
  if (Array.isArray(data)) return data;

  return [];
}


function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}
