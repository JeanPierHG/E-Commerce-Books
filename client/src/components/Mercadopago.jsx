import React from 'react'

function Mercadopago() {
  const info = async () => {
    const data = await fetch(
      'http://ecommercehenryx.herokuapp.com/mercadopago/success'
    )
      .then((res) => res.json())
      .then((data) => data)

    return data
  }

  console.log(data)

  console.log('USE PARAMS', data)
  return <div>Hola</div>
}

export default Mercadopago
