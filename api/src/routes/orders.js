const { Router } = require("express");
const Orders = require("../model/Order");

const router = Router();

router.get("/getAllOrders", async (req, res) => {
  try {
    const allOrden = await Orders.find({}).populate('usuario')
    return res.json(allOrden);
  } catch (error) {
    console.log("FALLO EN LAS ORDENES", error);
  }
});

module.exports = router;
