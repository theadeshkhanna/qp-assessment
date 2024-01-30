const express = require("express");
const router = express.Router();

const {
  createCategory,
  updatedCategory,
  getCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", createCategory);
router.patch("/:id", updatedCategory);
router.get("/:id", getCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

module.exports = {
  categoryRouter: router,
};
