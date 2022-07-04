import React from 'react'
import { useState } from 'react'
import styles from '../Styles/cardAuthor.module.css'

const CardAuthor = ({ name, surname, picture }) => {
  const defaultImg =
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
  return (
    <div className={styles.container}>
      <h3 className={styles.name}>
        {name} {surname}{' '}
      </h3>
      <img src={picture} className={styles.img} alt='Buscando imagen...' />
    </div>
  )
}

export default CardAuthor
