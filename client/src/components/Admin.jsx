import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/DashboardAdmin.module.css'
export function Admin() {
  return (
    <div className={styles.admin}>
      <div className={styles.containerAdmin}>
        <Link to='/add'>
          <button className={styles.btn}>Agregar Data</button>
        </Link>

        <Link to='/delete'>
          <button className={styles.btn}>Borrar Data</button>
        </Link>

        <Link to='/put'>
          <button className={styles.btn}>Modificar Data</button>
        </Link>

        <Link to='/stock'>
          <button className={styles.btn}>Ver Stock</button>
        </Link>
      </div>
    </div>
  )
}
