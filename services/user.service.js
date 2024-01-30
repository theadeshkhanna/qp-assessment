const db = require("../models/index");
const bcrypt = require("bcrypt");

class UserService {
  static getInstance() {
    return new UserService();
  }

  async createUser(payload, role) {
    return await db.User.create({
      firstName: payload.firstName,
      lastName: payload.lastName || null,
      email: payload.email,
      password: await bcrypt.hash(payload.password, 10),
      role: role,
    });
  }

  async findUserByEmailId(email) {
    return await db.User.findOne({
      where: { email },
    });
  }
}

module.exports = {
  userService: UserService.getInstance(),
};
