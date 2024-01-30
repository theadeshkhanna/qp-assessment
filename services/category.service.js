const db = require("../models/index");

class CategoryService {
  static getInstance() {
    return new CategoryService();
  }

  async createCategory(payload) {
    return await db.Category.create({
      categoryValue: payload.categoryValue,
    });
  }

  async getCategoryById(id) {
    return await db.Category.findOne({
      where: {
        id: id,
      },
    });
  }

  async getCategories() {
    return await db.Category.findAll();
  }

  async deleteCategoryById(id) {
    return await db.Category.destroy({
      where: {
        id: id,
      },
    });
  }

  async updateCategory(payload, id) {
    await db.Category.update(
      {
        categoryValue: payload.categoryValue,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }
}

module.exports = {
  categoryService: CategoryService.getInstance(),
};
