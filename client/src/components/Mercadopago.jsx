import React from 'react'

function Mercadopago() {
  fetch('http://ecommercehenryx.herokuapp.com/mercadopago/success')
    .then((res) => res.json())
    .then((data) => console.log(data))

  console.log('USE PARAMS', data)
  return <div>Hola</div>
}

export default Mercadopago
