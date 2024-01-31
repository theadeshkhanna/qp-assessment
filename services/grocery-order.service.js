const db = require("../models/index");

class GroceryOrderService {
  static getInstance() {
    return new GroceryOrderService();
  }

  async createGroceryOrders(orderId, payload) {
    const enrichedPayload = payload.map((item) => ({ ...item, orderId }));
    return await db.GroceryOrder.bulkCreate(enrichedPayload);
  }
}

module.exports = {
  groceryOrderService: GroceryOrderService.getInstance(),
};
