const db = require("../models/index");

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

    // handle 0 case here
    if (payload.quantityInWareHouse) {
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
    // await grocery.update(
    //     {
    //         name: payload?.name,
    //         quantityInWareHouse: payload?.quantityInWareHouse,
    //         categoryId: payload?.categoryId,
    //         priceType: payload?.priceType,
    //         price: payload?.price,
    //         imageUrl: payload?.imageUrl
    //     },
    //     {
    //         where: {
    //             id: id,
    //         },
    //     },
    // );
  }
}

module.exports = {
  groceryService: GroceryService.getInstance(),
};
