const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  static getInstance() {
    return new AuthService();
  }

  async generateToken(user) {
    return jwt.sign({ user }, process.env.AUTH_KEY, undefined, undefined);
  }

  async comparePasswords(payloadPassword, dbPassword) {
    return await bcrypt.compare(payloadPassword, dbPassword);
  }
}

module.exports = {
  authService: AuthService.getInstance(),
};
