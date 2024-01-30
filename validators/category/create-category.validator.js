const validator = require("validatorjs");

const createCategoryValidator = (data) => {
  return new validator(data, {
    categoryValue: "required|string",
  });
};

module.exports = createCategoryValidator;
