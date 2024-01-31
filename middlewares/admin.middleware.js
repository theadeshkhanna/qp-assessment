const { adminService } = require("../services/admin.service");

const adminMiddleware = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    const isUserAdmin = await adminService.getAdminByUserId(user.id);
    if (!isUserAdmin) {
      return res.status(401).json({ error: "Only admins have access" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Please login, then try" });
  }
};

module.exports = adminMiddleware;
