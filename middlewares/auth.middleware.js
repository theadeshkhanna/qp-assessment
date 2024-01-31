const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    if (!token.includes("Bearer")) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    const authToken = token.split(" ")[1];
    req.user = jwt.verify(
      authToken,
      process.env.AUTH_KEY,
      undefined,
      undefined,
    ).user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Please login, then try" });
  }
};

module.exports = authMiddleware;
