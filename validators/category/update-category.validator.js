const validator = require("validatorjs");

const updateCategoryValidator = (data) => {
  return new validator(data, {
    categoryValue: "string",
  });
};

module.exports = updateCategoryValidator;
