"use strict";
const { Model } = require("sequelize");
const OrderStatusEnum = require("../enums/order-status.enum");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.GroceryOrder, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      customerId: DataTypes.INTEGER,
      totalAmount: DataTypes.INTEGER,
      orderStatus: DataTypes.ENUM(Object.values(OrderStatusEnum)),
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
