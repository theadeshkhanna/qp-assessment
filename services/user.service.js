const db = require("../models/index");
const bcrypt = require("bcrypt");
const UserRoleEnum = require("../enums/user-role.enum")

class UserService {
    static getInstance() {
        return new UserService();
    }

    async createUser(payload) {
        return await db.User.create({
            firstName: payload.firstName,
            lastName: payload.lastName || null,
            email: payload.email,
            password: await bcrypt.hash(payload.password, 10),
            role: UserRoleEnum.CUSTOMER
        })
    }

    async findUserByEmailId(email) {
        return await db.User.findOne({
            where: {email}
        })
    }
}

module.exports = {
    userService: UserService.getInstance()
}