const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");

router.post("/signup/customer", signup);
router.post("/signup/admin", signup);
router.post("/login", login);

module.exports = {
  authRoute: router,
};
