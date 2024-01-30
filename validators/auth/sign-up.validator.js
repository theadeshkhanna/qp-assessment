const validator = require("validatorjs");

const signupValidator = (data) => {
  return new validator(data, {
    firstName: "required|string",
    lastName: "string",
    email: "required|email",
    password: "required|string|confirmed",
  });
};

module.exports = signupValidator;
