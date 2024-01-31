const express = require("express");
const router = express.Router();

const { authRoute } = require("../routes/auth.route");
const { categoryRouter } = require("../routes/category.route");
const { groceryRouter } = require("../routes/grocery.route");
const { orderRouter } = require("../routes/order.route");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.use("/auth", authRoute);
router.use("/category", authMiddleware, adminMiddleware, categoryRouter);
router.use("/grocery", authMiddleware, adminMiddleware, groceryRouter);
router.use("/order", authMiddleware, orderRouter);

module.exports = {
  indexRouter: router,
};
