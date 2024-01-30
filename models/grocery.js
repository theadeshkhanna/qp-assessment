"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grocery.init(
    {
      name: DataTypes.STRING,
      quantityInWareHouse: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      priceType: DataTypes.ENUM("PER_KG", "PER_UNIT"),
      price: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Grocery",
    },
  );
  return Grocery;
};
