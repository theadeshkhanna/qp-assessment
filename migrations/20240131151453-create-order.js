"use strict";
const OrderStatusEnum = require("../enums/order-status.enum");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        foreignKey: true,
        references: {
          model: "Customers",
          key: "id",
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      totalAmount: {
        type: Sequelize.INTEGER,
      },
      orderStatus: {
        type: Sequelize.ENUM(Object.values(OrderStatusEnum)),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
