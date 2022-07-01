const { Router } = require('express')
const router = Router()

// SDK de Mercado Pago
const mercadopago = require('mercadopago')

// Agrega credenciales
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN',
})

router.post('/orden', (req, res) => {
  const { carrito } = req.body

  const itemsMp = carrito?.map((e) => ({
    title: e.title,
    unit_price: Number(e.price),
    quantity: Number(e.quantity),
  }))

  let preference = {
    items: itemsMp,
    // external_reference: ``,
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

  mercadopago.preferences
    .create(preference)

    .then(function (response) {
      console.info('RESPONDIO')
      global.id = response.body.id
      console.log(response.body)
      res.json({
        id: global,
      })
    })
    .catch(function (error) {
      console.log('FALLO MERCADO PAGO', error)
    })
})

module.exports = router
