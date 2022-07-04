

const { Router } = require("express");
const router = Router();


// SDK de Mercado Pago
const mercadopago = require('mercadopago')

const vendedor =
  "TEST-47481287450311-070117-c9509224bf9d5811d4f272d8236f85ea-1152954796";

mercadopago.configure({

  access_token: `${vendedor}`,
});

router.post("/orden", async (req, res) => {
  const carrito = req.body;


  
  try {
    const id_order = 1;
    const itemsMp = carrito?.map((e) => ({
      title: e.title,
      unit_price: Number(e.unit_price),
      quantity: Number(e.quantity),
    }));

    let preference = {
      items: itemsMp,
      external_reference: `${id_order}`,
      payment_methods: {
        excluded_payment_type: [
          {
            id: "atm",
          },
        ],
        installments: 4,
      },

      back_urls: {
        success: "http://localhost:8080/feedback",
        failure: "http://localhost:8080/feedback",
        pending: "http://localhost:8080/feedback",
      },
      auto_return: "approved",
    };

    const respuesta= await mercadopago.preferences
      .create(preference)
      console.log('///////', respuesta.body)
          const globalInitPoint= respuesta.body.init_point
           res.json({init_point:globalInitPoint})

      
  } catch (error) {
    return console.log("FALLO MERCADO PAGO", error);
  }


});
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

module.exports = router;

