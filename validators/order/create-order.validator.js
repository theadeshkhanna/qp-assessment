const validator = require("validatorjs");

const createOrderValidator = (data) => {
  return new validator(data, {
    "items.*.groceryId": "numeric",
    "items.*.quantity": "numeric|min:1",
  });
};

module.exports = createOrderValidator;
