const loginValidator = require("../validators/auth/login.validator");
const signupValidator = require("../validators/auth/sign-up.validator");
const { userService } = require("../services/user.service");
const { authService } = require("../services/auth.service");
const { customerService } = require("../services/customer.service");
const { adminService } = require("../services/admin.service");
const UserRoleEnum = require("../enums/user-role.enum");

const login = async (req, res) => {
  const payload = req.body;

  try {
    const validator = await loginValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    const dbUser = await userService.findUserByEmailId(payload.email);
    if (!dbUser) {
      return res
        .status(404)
        .json({ error: `User with this email does not exist` });
    }

    const isPasswordCorrect = await authService.comparePasswords(
      payload.password,
      dbUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: `Password entered is wrong` });
    }

    const token = await authService.generateToken(dbUser);
    return res.status(200).json({ data: dbUser, token: token });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const signup = async (req, res) => {
  const payload = req.body;

  try {
    const validator = await signupValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    const dbUser = await userService.findUserByEmailId(payload.email);
    if (dbUser) {
      return res
        .status(404)
        .json({ error: `user with this email already exists, please login` });
    }

    const role = req.url.includes("customer")
      ? UserRoleEnum.CUSTOMER
      : UserRoleEnum.ADMIN;
    const user = await userService.createUser(payload, role);

    if (role === UserRoleEnum.CUSTOMER) {
      await customerService.createCustomer(user.id);
    } else {
      await adminService.createAdmin(user.id);
    }

    const token = await authService.generateToken(user);
    return res.status(200).json({ data: user, token: token });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

module.exports = {
  login: login,
  signup: signup,
};
