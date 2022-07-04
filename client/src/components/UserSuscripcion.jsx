import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CardPremium from './CardPremium'
import styles from '../Styles/UserSuscripcion.module.css'
const UserSuscripcion = () => {
const [state, setState] = useState({
    mensual: '$599,99 mes',
    trimestral: '',
    anual: '',
  })

  const handleChangeMonth = () => {
    setState({
      mensual: '$599,99 / mes',
    })
  }

  const handleChangeThreMonth = () => {
    setState({
      trimestral: '$999,99 / trimestral',
    })
  }

  const handleChangeYear = () => {
    setState({
      anual: '$1.599,99 / anual',
    })
  }

  return (
    <div className={styles.containerUserSuscription}>
      <h1 className={styles.titleUserSuscription}>
        Una suscripcion sin igual para potenciar tu desarrollo personal al
        máximo.
      </h1>

      <h4>Mejora tu futuro con las herramientas que te ofrece Soy Premium.</h4>

      <p> Elegi tu cobro preferido de estas tres opciones:</p>
      <div className={styles.containerButton}>
        <button className={styles.button} onClick={handleChangeMonth}>
          Mensual
        </button>
        <button className={styles.button} onClick={handleChangeThreMonth}>
          Trimestral
        </button>
        <button className={styles.button} onClick={handleChangeYear}>
          Anual
        </button>
      </div>

      <CardPremium
        mes={state.mensual}
        trimestral={state.trimestral}
        anual={state.anual}
      />
    </div>
  )
}

export default UserSuscripcion
