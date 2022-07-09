import React, { useState } from 'react'

function Mercadopago() {
  const [data, setData] = useState({})

  const handleClick = () => {
    fetch('https://ecommercehenryx.herokuapp.com/mercadopago/success').then(
      (res) => res.json().then((data) => setData(data))
    )
  }

  console.log(data)

  return (
    <div>
      <button onClick={handleClick}>Presionar</button>
      <br />
      <p>{data?.fecha}</p>
      <p>{data?.isHidden}</p>
      <p>{data?.status}</p>
      <p>{data?.produt[0]}</p>
    </div>
  )
}

export default Mercadopago
