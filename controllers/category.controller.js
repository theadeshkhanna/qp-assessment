const createCategoryValidator = require("../validators/category/create-category.validator");
const { categoryService } = require("../services/category.service");
const updateCategoryValidator = require("../validators/category/update-category.validator");

const createCategory = async (req, res) => {
  const payload = req.body;

  try {
    const validator = await createCategoryValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    const category = await categoryService.createCategory(payload);
    return res.status(200).json({ data: category });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const getCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ error: `category with this id does not exist` });
    }

    return res.status(200).json({ data: category });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({ data: categories });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ error: `category with this id does not exist` });
    }

    await categoryService.deleteCategoryById(categoryId);
    return res.status(200).json({ data: "category successfully deleted" });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const updatedCategory = async (req, res) => {
  const categoryId = req.params.id;
  const payload = req.body;

  try {
    const validator = await updateCategoryValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ error: `category with this id does not exist` });
    }

    await categoryService.updateCategory(payload, categoryId);
    const updatedCategory = await categoryService.getCategoryById(categoryId);
    return res.status(200).json({ data: updatedCategory });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

module.exports = {
  createCategory: createCategory,
  getCategory: getCategory,
  getCategories: getCategories,
  deleteCategory: deleteCategory,
  updatedCategory: updatedCategory,
};
