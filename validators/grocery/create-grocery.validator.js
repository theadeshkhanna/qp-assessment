const validator = require("validatorjs");

const createGroceryValidator = (data) => {
  return new validator(data, {
    name: "required|string",
    quantityInWareHouse: "required|numeric|min:0",
    quantityType: "required|in:KG,UNIT",
    categoryId: "required|numeric",
    priceType: "required|in:PER_KG,PER_UNIT",
    price: "required|numeric|min:0",
    imageUrl: "string",
  });
};

module.exports = createGroceryValidator;
