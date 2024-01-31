"use strict";
const { Model } = require("sequelize");
const GroceryQuantityTypeEnum = require("../enums/grocery-quantity-type.enum");
const GroceryPriceTypeEnum = require("../enums/grocery-price-type.enum");
module.exports = (sequelize, DataTypes) => {
  class Grocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.GroceryOrder, { foreignKey: "groceryId" });
    }
  }
  Grocery.init(
    {
      name: DataTypes.STRING,
      quantityInWareHouse: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      priceType: DataTypes.ENUM(Object.values(GroceryPriceTypeEnum)),
      price: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      quantityType: DataTypes.ENUM(Object.values(GroceryQuantityTypeEnum)),
    },
    {
      sequelize,
      modelName: "Grocery",
    },
  );
  return Grocery;
};
