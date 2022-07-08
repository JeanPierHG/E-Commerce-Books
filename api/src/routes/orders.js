const { Router } = require("express");
const Orders = require("../model/Order");

const router = Router();

router.get("/getAllOrders", async (req, res) => {
  try {
    const allOrden = await Orders.find({}).populate("usuario");
    return res.json(allOrden);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/getAllOrdersByUser/:userId", async (req, res) => {
  const { userId } = req.params;
  const orders = await Orders.find({ userId: userId }).populate("books");
  return res.status(200).json(orders);
});

router.post("/changeStatus", async (req, res) => {
  const { orderIds, status } = req.body;
  try {
    if (orderIds.length === 0) throw new Error("Please agregar data");
    orderIds.forEach(async (orders) => {
      const order = await Orders.findById(orders);
      if (!order) throw new Error("The order not exists");
      order.status = status;
      await order.save();
    });
    res.send("Ordernes actualizadas");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post("/hideOrder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findById(id);
    if (!order) throw new Error("Orden no encontrada");
    order.isHidden = true;
    order.save();
    if (order.isHidden) return res.send("Orden ocultada");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/showOrder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findById(id);
    if (!order) throw new Error("Orden no encontrada");
    order.isHidden = false;
    order.save();
    if (!order.isHidden) return res.send("Orden desocultada");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/deleteOrder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Orders.findByIdAndDelete(id);
    res.send("Orden eliminada");
  } catch (error) {
    res.status(404).send("Un paso hiciste mal");
  }
});
module.exports = router;
