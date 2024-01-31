const createOrderValidator = require("../validators/order/create-order.validator");
const { orderService } = require("../services/order.service");
const { groceryService } = require("../services/grocery.service");
const { groceryOrderService } = require("../services/grocery-order.service");
const { customerService } = require("../services/customer.service");

const createOrder = async (req, res) => {
  const payload = req.body.items;
  const user = req.user;

  try {
    const validator = await createOrderValidator(payload);
    if (validator.fails()) {
      return res.status(422).json({ error: validator.errors.all() });
    }

    // checking if grocery type exists in table and
    // quantity asked is present or not.
    const groceryIds = payload.map((item) => item.groceryId);
    const groceries = await groceryService.getGroceriesByIds(groceryIds);

    const isValid = payload.every((requestedItem) => {
      const foundItem = groceries.find(
        (item) => item.id === requestedItem.groceryId,
      );
      return (
        foundItem && foundItem.quantityInWareHouse >= requestedItem.quantity
      );
    });

    if (!isValid) {
      return res
        .status(422)
        .json({ error: "Invalid groceries or insufficient quantity." });
    }

    let totalAmount = 0;
    const groceryOrders = [];

    for (const requestedItem of payload) {
      const foundItem = groceries.find(
        (item) => item.id === requestedItem.groceryId,
      );

      const subtotal = foundItem.price * requestedItem.quantity;
      totalAmount += subtotal;

      groceryOrders.push({
        groceryId: foundItem.id,
        quantity: requestedItem.quantity,
        subtotal: subtotal,
      });
    }

    const customer = await customerService.getCustomerFromUserId(user.id);
    const order = await orderService.createOrder(totalAmount, customer.id);
    await groceryOrderService.createGroceryOrders(order.id, groceryOrders);

    // updating the grocery quantity after order is created
    for (const groceryOrder of groceryOrders) {
      const grocery = await groceryService.getGroceryById(
        groceryOrder.groceryId,
      );
      await groceryService.updateGrocery(
        {
          quantityInWareHouse:
            grocery.quantityInWareHouse - groceryOrder.quantity,
        },
        grocery,
      );
    }

    return res.status(200).json({ data: order });
  } catch (e) {
    return res.status(500).json({ error: `Something went wrong` });
  }
};

const getOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ error: `order with this id does not exist` });
    }

    return res.status(200).json({ data: order });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    return res.status(200).json({ data: orders });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

module.exports = {
  createOrder: createOrder,
  getOrder: getOrder,
  getOrders: getOrders,
};
