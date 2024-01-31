"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GroceryOrders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      groceryId: {
        foreignKey: true,
        references: {
          model: "Groceries",
          key: "id",
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        foreignKey: true,
        references: {
          model: "Orders",
          key: "id",
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      subtotal: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("GroceryOrders");
  },
};
