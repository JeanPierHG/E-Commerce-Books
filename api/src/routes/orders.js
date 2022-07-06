const { Router } = require('express')
const Orders = require('../model/Order')

const router = Router()

router.get('/getAllOrders', async (req, res) => {
  try {
    const allOrden = await Orders.find({}).populate('usuario')
    return res.json(allOrden)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/changeStatus', async (req, res) => {
  const { orderIds, status } = req.body
  try {
    if (orderIds.length === 0) throw new Error('Please agregar data')
    orderIds.forEach(async (orders) => {
      const order = await Orders.findById(orders)
      if (!order) throw new Error('The order not exists')
      order.status = status
      await order.save()
    })
    res.send('Ordernes actualizadas')
  } catch (error) {
    res.status(404).json(error.message)
  }
})
module.exports = router
