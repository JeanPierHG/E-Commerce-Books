const { Router } = require("express");
const Orders = require("../model/Order");

const router = Router();

router.get("/getAllOrders", async (req, res) => {
  try {
    const allOrden = await Orders.find({}).populate("usuario");
    return res.json(allOrden);
  } catch (error) {
    console.log("FALLO EN LAS ORDENES", error);
  }
});

router.get("/getAllOrdersByUser/:userId", async (req, res) => {
  const { userId } = req.params;
  const orders = await Orders.find({ userId: userId }).populate("books");
  return res.status(200).json(orders);
});

module.exports = router;
