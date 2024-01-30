const db = require("../models/index");

class AdminService {
  static getInstance() {
    return new AdminService();
  }

  async createAdmin(userId) {
    return await db.Admin.create({
      userId: userId,
    });
  }
}

module.exports = {
  adminService: AdminService.getInstance(),
};
