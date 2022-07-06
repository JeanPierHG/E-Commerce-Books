require('dotenv').config()
const { Router } = require('express')
const router = Router()
const { ACCESS_TOKEN } = process.env

// SDK de Mercado Pago
const mercadopago = require('mercadopago')
const Orders = require('../model/Order')
const Users = require('../model/Users')
const { Enum } = require('./EmunStatus')
const { randomId } = require('./FuntionID')

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
})

router.post('/orden', async (req, res) => {
  const carrito = req.body
  const email = carrito.map((e) => e.email)

  const ID = randomId(100)
  const ID2 = randomId(100)
  const idOrder = `a${ID}b${ID2}`

  const monto = carrito
    .map((e) => {
      const montoTem = e.unit_price * carrito.length
      return montoTem
    })
    .reduce((a, b) => a + b)

  const user = await Users.findOne({ email: email[0] })

  const newOrder = new Orders({
    status: Enum.CREATED,
    fecha: new Date(),
    usuario: user._id,
    produt: carrito.map((e) => e.title),
    total: monto,
    payment_id: idOrder,
    payment_status: idOrder,
    payment_order_id: idOrder,
  })

  await newOrder.save()
  user.buyBooks = user.buyBooks.concat(newOrder._id)
  await user.save()

  try {
    const itemsMp = carrito?.map((e) => ({
      title: e.title,
      unit_price: Number(e.unit_price),
      quantity: Number(e.quantity),
    }))

    let preference = {
      items: itemsMp,
      external_reference: `${idOrder}`,
      payment_methods: {
        excluded_payment_type: [
          {
            id: 'atm',
          },
        ],
        installments: 4,
      },

      back_urls: {
        success: 'http://localhost:8080/feedback',
        failure: 'http://localhost:8080/feedback',
        pending: 'http://localhost:8080/feedback',
      },
      auto_return: 'approved',
    }
    const saveOrder = await Orders.findById({ _id: newOrder._id }).populate({
      path: 'usuario',
    })

    const respuesta = await mercadopago.preferences.create(preference)

    const globalInitPoint = respuesta.body.init_point
    return res.json({ init_point: globalInitPoint, order: saveOrder })
  } catch (error) {
    return console.log('FALLO MERCADO PAGO', error)
  }
})
// {"id":1152954796,"nickname":"TETE5687095","password":"qatest2807","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-01T17:25:00-04:00","date_last_updated":"2022-07-01T17:25:00-04:00"} VENDEDOR

// {"id":1152955480,"nickname":"TETE6325107","password":"qatest9152","site_status":"active","site_id":"MCO","description":"a description","date_created":"2022-07-01T17:26:17-04:00","date_last_updated":"2022-07-01T17:26:17-04:00"}

// -H "Content-Type: application/json" \
// -H 'Authorization: Bearer TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994 ' \
// "https://api.mercadopago.com/users/test" \
// -d '{"site_id":"MCO","description" : "a description"}'

// const mercado={
//   {"id":1152313861,"nickname":"TESTJZQE2T8N","password":"qatest1091","site_status":"active","email":"test_user_24242501@testuser.com"}//vendedor

// {"id":1152320451,"nickname":"TESTKLOPS6H1","password":"qatest5467","site_status":"active","email":"test_user_120617@testuser.com"}

// }

module.exports = router
