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
}

module.exports = {
  customerService: CustomerService.getInstance(),
};
