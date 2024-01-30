const createGroceryValidator = require("../validators/grocery/create-grocery.validator");
const { groceryService } = require("../services/grocery.service");
const updateGroceryValidator = require("../validators/grocery/update-grocery.validator");
const { categoryService } = require("../services/category.service");

const createGrocery = async (req, res) => {
  const payload = req.body;

  try {
    const validator = await createGroceryValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    const category = await categoryService.getCategoryById(req.body.categoryId);
    if (!category) {
      return res.status(404).json({ error: `category does not exists` });
    }

    const grocery = await groceryService.createGrocery(payload);
    return res.status(200).json({ data: grocery });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const getGrocery = async (req, res) => {
  const groceryId = req.params.id;

  try {
    const grocery = await groceryService.getGroceryById(groceryId);
    if (!grocery) {
      return res
        .status(404)
        .json({ error: `grocery with this id does not exist` });
    }

    return res.status(200).json({ data: grocery });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const getGroceries = async (req, res) => {
  try {
    const groceries = await groceryService.getGroceries();
    return res.status(200).json({ data: groceries });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const deleteGrocery = async (req, res) => {
  const groceryId = req.params.id;

  try {
    const grocery = await groceryService.getGroceryById(groceryId);
    if (!grocery) {
      return res
        .status(404)
        .json({ error: `grocery with this id does not exist` });
    }

    await groceryService.deleteGroceryById(groceryId);
    return res.status(200).json({ data: "grocery successfully deleted" });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const updatedGrocery = async (req, res) => {
  const groceryId = req.params.id;
  const payload = req.body;

  try {
    const validator = await updateGroceryValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    const grocery = await groceryService.getGroceryById(groceryId);
    if (!grocery) {
      return res
        .status(404)
        .json({ error: `grocery with this id does not exist` });
    }

    if (payload.categoryId) {
      const category = await categoryService.getCategoryById(
        req.body.categoryId,
      );
      if (!category) {
        return res.status(404).json({ error: `category does not exists` });
      }
    }

    await groceryService.updateGrocery(payload, grocery);
    const updatedGrocery = await groceryService.getGroceryById(groceryId);
    return res.status(200).json({ data: updatedGrocery });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

module.exports = {
  createGrocery: createGrocery,
  getGrocery: getGrocery,
  getGroceries: getGroceries,
  deleteGrocery: deleteGrocery,
  updatedGrocery: updatedGrocery,
};
