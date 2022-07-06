import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../../Styles/Add.module.css'

export default function Add() {
  return (
    <div className={styles.add}>
      <div className={styles.containerAdd}>
        <div className={styles.actionsButtons}>
          <Link to='/addauthor'>
            <button className={styles.btn}>Agregar Autor</button>
          </Link>

          <Link to='/addbook'>
            <button className={styles.btn}>Agregar Libro</button>
          </Link>
        </div>

        <Link to='/admin'>
          <button className={`${styles.btn} ${styles.btnAdmin}`}>↼ Back</button>
        </Link>
      </div>
    </div>
  )
}
