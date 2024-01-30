const validator = require("validatorjs");

const loginValidator = (data) => {
  return new validator(data, {
    email: "required|email",
    password: "required|string",
  });
};

module.exports = loginValidator;
