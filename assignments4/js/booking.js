export class Booking {
  constructor(house) {
    this.house = house;
    this.checkIn = null;
    this.days = 1;
    this.addons = [];
    this.discountCode = "";

    this.addonPrices = {
      breakfast: { label: "Frukost (100 kr/dag)", perDay: true, price: 100 },
      tour:      { label: "Spökvandring (300 kr)", perDay: false, price: 300 },
      seance:    { label: "Nattlig seans (500 kr)", perDay: false, price: 500 }
    };

    console.log("ny booking skapad för:", house.name);
  }

  validate() {
    const errors = [];

    if (!this.checkIn) {
      errors.push("Du måste välja ett incheckningsdatum.");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(this.checkIn);
      if (chosen < today) {
        errors.push("Incheckningsdatum kan inte vara i det förflutna.");
      }
    }

    if (!this.days || this.days < 1) {
      errors.push("Antal nätter måste vara minst 1.");
    }

    // kan säkert bli fler fel sen men de här räker
    console.log("validering körd, antal fel:", errors.length);
    return errors;
  }

  calculatePrice() {
    let total = this.house.pricePerNight * this.days;
    let rabattKod = this.discountCode.trim().toUpperCase();

    for (const key of this.addons) {
      const addon = this.addonPrices[key];
      if (!addon) {
        continue;
      }
      if (addon.perDay) {
        total += addon.price * this.days;
      } else {
        total += addon.price;
      }
    }

    if (rabattKod === "GHOST20") {
      total = total * 0.8;
    }

    if (rabattKod === "YUSUF80") {
      total = total * 0.2;
    }

    console.log("räknar pris...", total);
    return Math.round(total);
  }

  hasDiscount() {
    const rabattKod = this.discountCode.trim().toUpperCase();

    if (rabattKod === "GHOST20") {
      return true;
    }

    if (rabattKod === "YUSUF80") {
      return true;
    }

    return false;
  }

  confirmationHTML() {
    const addonLabels = [];
    for (const key of this.addons) {
      const addon = this.addonPrices[key];
      if (addon) addonLabels.push(addon.label);
    }

    let discountRow = "";
    if (this.hasDiscount()) {
      if (this.discountCode.trim().toUpperCase() === "YUSUF80") {
        discountRow = "<p>Kampanjkod YUSUF80 tillämpad - 80% rabatt!</p>";
      } else {
        discountRow = "<p>Kampanjkod GHOST20 tillämpad - 20% rabatt!</p>";
      }
    }

    return `
      <h3>Bokningsbekräftelse</h3>
      <p><strong>Hus:</strong> ${this.house.name}</p>
      <p><strong>Plats:</strong> ${this.house.location}</p>
      <p><strong>Incheckning:</strong> ${this.checkIn}</p>
      <p><strong>Antal nätter:</strong> ${this.days}</p>
      <p><strong>Tillägg:</strong> ${addonLabels.length > 0 ? addonLabels.join(', ') : 'Inga'}</p>
      ${discountRow}
      <p><strong>Totalpris:</strong> ${this.calculatePrice()} kr</p>
      <p>Tack för din bokning!</p>
    `;
  }
}
