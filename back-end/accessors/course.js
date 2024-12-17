const courseAccessors = {
  getPrice() {
    const rawValue = this.getDataValue("price");
    return new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue);
  },
  setPrice(value) {
    // eliminam orice spatii sau puncte care nu sunt necesare
    let normalizedValue = String(value).replace(/\./g, "").replace(",", ".");

    // convertim la un numar și salvam cu doua zecimale
    const formattedValue = parseFloat(normalizedValue).toFixed(2);

    // salvam valoarea in formatul dorit, folosind setDataValue
    this.setDataValue("price", formattedValue);
  },
};

module.exports = courseAccessors;
