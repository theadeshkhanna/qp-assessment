const validator = require("validatorjs");

const updateGroceryValidator = (data) => {
  return new validator(data, {
    name: "string",
    quantityInWareHouse: "numeric|min:0",
    quantityType: "in:KG,UNIT",
    categoryId: "numeric",
    priceType: "in:PER_KG,PER_UNIT",
    price: "numeric|min:0",
    imageUrl: "string",
  });
};

module.exports = updateGroceryValidator;
