const db = require("../models/index");
const { Op } = require("sequelize");

class GroceryService {
  static getInstance() {
    return new GroceryService();
  }

  async createGrocery(payload) {
    return await db.Grocery.create({
      name: payload.name,
      quantityInWareHouse: payload.quantityInWareHouse,
      quantityType: payload.quantityType,
      categoryId: payload.categoryId,
      priceType: payload.priceType,
      price: payload.price,
      imageUrl: payload.imageUrl || null,
    });
  }

  async getGroceryById(id) {
    return await db.Grocery.findOne({
      where: {
        id: id,
      },
    });
  }

  async getGroceries() {
    return await db.Grocery.findAll();
  }

  async getGroceriesByIds(ids) {
    return await db.Grocery.findAll({
      where: {
        id: ids,
      },
    });
  }

  async deleteGroceryById(id) {
    return await db.Grocery.destroy({
      where: {
        id: id,
      },
    });
  }

  async updateGrocery(payload, grocery) {
    if (payload.name) {
      grocery.name = payload.name;
    }

    if (payload.name) {
      grocery.name = payload.name;
    }

    // Handling it like this because it can be 0 as well, and for
    // that it will become falsely and will not update
    if ("quantityInWareHouse" in payload) {
      grocery.quantityInWareHouse = payload.quantityInWareHouse;
    }

    if (payload.quantityType) {
      grocery.quantityType = payload.quantityType;
    }

    if (payload.categoryId) {
      grocery.categoryId = payload.categoryId;
    }

    if (payload.priceType) {
      grocery.priceType = payload.priceType;
    }

    if (payload.price) {
      grocery.price = payload.price;
    }

    await grocery.save();
  }
}

module.exports = {
  groceryService: GroceryService.getInstance(),
};
