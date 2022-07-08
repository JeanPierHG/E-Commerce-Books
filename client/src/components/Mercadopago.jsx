import React from 'react'

function Mercadopago() {
  const handleClick = async () => {
    fetch('https://ecommercehenryx.herokuapp.com/mercadopago/success')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <div>
      <button onClick={handleClick}>Presionar</button>
    </div>
  )
}

export default Mercadopago
