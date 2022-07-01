import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/DashboardAdmin.module.css'
import { getBooksAdmin , getAuthorsAdmin } from '../actions'
import { useDispatch } from 'react-redux'


export function Admin() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getBooksAdmin())
  })

  useEffect(()=>{
    dispatch(getAuthorsAdmin())
  })

  return (
    <div className={styles.admin}>
      <div className={styles.containerAdmin}>
        <Link to='/add'>
          <button className={styles.btn}>Agregar Data</button>
        </Link>

        <Link to='/delete'>
          <button className={styles.btn}>Borrar/Ocultar Data</button>
        </Link>

        <Link to='/put'>
          <button className={styles.btn}>Modificar Data</button>
        </Link>

        <Link to='/stock'>
          <button className={styles.btn}>Ver Stock</button>
        </Link>

        <Link to='/adminusers'>
          <button className={styles.btn}>Usuarios</button>
        </Link>

        <Link to='/adminusers2'>
          <button className={styles.btn}>Usuarios2</button>
        </Link>

        <Link to='/adminorders'>
          <button className={styles.btn}>Ordenes</button>
        </Link>

        <Link to='/admincarrusel'>
          <button className={styles.btn}>Carrusel</button>
        </Link>
        
      </div>
    </div>
  )
}
