const db = require("../models/index");
const OrderStatusEnum = require("../enums/order-status.enum");

class OrderService {
  static getInstance() {
    return new OrderService();
  }

  async createOrder(totalAmount, customerId) {
    return await db.Order.create({
      customerId: customerId,
      totalAmount: totalAmount,
      orderStatus: OrderStatusEnum.PENDING,
    });
  }

  async getOrderById(id) {
    return await db.Order.findOne({
      where: {
        id: id,
      },
    });
  }

  async getOrders() {
    return await db.Order.findAll();
  }
}

module.exports = {
  orderService: OrderService.getInstance(),
};
