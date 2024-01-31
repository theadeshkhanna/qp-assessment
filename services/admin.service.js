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

  async getAdminByUserId(id) {
    return await db.Admin.findOne({
      where: { id: id },
    });
  }
}

module.exports = {
  adminService: AdminService.getInstance(),
};
