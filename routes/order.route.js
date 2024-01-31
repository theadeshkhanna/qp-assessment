const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getOrders,
} = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/:id", getOrder);
router.get("/", getOrders);

module.exports = {
  orderRouter: router,
};
