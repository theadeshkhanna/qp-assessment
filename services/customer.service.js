const db = require("../models/index");

class CustomerService {
  static getInstance() {
    return new CustomerService();
  }

  async createCustomer(userId) {
    return await db.Customer.create({
      userId: userId,
    });
  }

  async getCustomerFromUserId(userId) {
    return await db.Customer.findOne({
      where: {
        userId: userId,
      },
    });
  }
}

module.exports = {
  customerService: CustomerService.getInstance(),
};
