const { Router } = require('express')
const Orders = require('../model/Order')
const processEmail = require('../mercadoPago/util/processEmail')
const shippedEmail = require('../mercadoPago/util/shippedEmail')
const completedEmail = require('../mercadoPago/util/completedEmail')
const canceledEmail = require('../mercadoPago/util/canceledEmail')
const router = Router()

router.get('/getAllOrders', async (req, res) => {
  try {
    const allOrden = await Orders.find({}).populate('usuario')
    return res.json(allOrden)
  } catch (error) {
    res.send(error.message)
  }
})

router.get('/getAllOrdersByUser/:userId', async (req, res) => {
  const { userId } = req.params
  const orders = await Orders.find({ userId: userId }).populate('books')
  return res.status(200).json(orders)
})

router.post('/changeStatus', async (req, res) => {
  const { ordersIds, status } = req.body
  console.log(req.body)
  try {
    if (ordersIds.length === 0) throw new Error('Please agregar data')
    ordersIds.forEach(async (orders) => {
      const order = await Orders.findById(orders).populate('usuario')
      if (!order) throw new Error('The order not exists')

      const name = order.usuario[0].name
      const email = order.usuario[0].email

      if (status === 'Procesada') processEmail.enviar_mail_process(name, email)
      if (status === 'Completada')
        completedEmail.enviar_mail_completed(name, email)
      if (status === 'Cancelada')
        canceledEmail.enviar_mail_canceled(name, email)
      if (status === 'Enviada') shippedEmail.enviar_mail_shipped(name, email)

      order.status_order = status
      await order.save()
    })
    res.send('Ordernes actualizadas')
  } catch (error) {
    res.status(404).json(error.message)
  }
})

router.post('/hideOrder/:id', async (req, res) => {
  const { id } = req.params
  try {
    const order = await Orders.findById(id)
    if (!order) throw new Error('Orden no encontrada')
    order.isHidden = true
    order.save()
    if (order.isHidden) return res.send('Orden ocultada')
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/showOrder/:id', async (req, res) => {
  const { id } = req.params
  try {
    const order = await Orders.findById(id)
    if (!order) throw new Error('Orden no encontrada')
    order.isHidden = false
    order.save()
    if (!order.isHidden) return res.send('Orden desocultada')
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.delete('/deleteOrder/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Orders.findByIdAndDelete(id)
    res.send('Orden eliminada')
  } catch (error) {
    res.status(404).send('Un paso hiciste mal')
  }
})
module.exports = router
