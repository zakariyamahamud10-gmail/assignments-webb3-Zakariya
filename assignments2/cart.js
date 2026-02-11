let cart = [];

export function addToCart(product) {

  let befintligProdukt = null;

  // Loopar igenom hela cart
  for (let i = 0; i < cart.length; i++) {

    // Om vi hittar samma id
    if (cart[i].id === product.id) {
      befintligProdukt = cart[i];
    }
  }

  if (befintligProdukt) {
    befintligProdukt.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  console.log("Cart just nu:", cart);
}
