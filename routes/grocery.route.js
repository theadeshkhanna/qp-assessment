const express = require("express");
const router = express.Router();

const {
  createGrocery,
  updatedGrocery,
  getGrocery,
  getGroceries,
  deleteGrocery,
} = require("../controllers/grocery.controller");

router.post("/", createGrocery);
router.patch("/:id", updatedGrocery);
router.get("/:id", getGrocery);
router.get("/", getGroceries);
router.delete("/:id", deleteGrocery);

module.exports = {
  groceryRouter: router,
};
