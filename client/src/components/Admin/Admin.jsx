import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/DashboardAdmin.module.css'
import { getBooksAdmin , getAuthorsAdmin } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'


export function Admin() {

  const dispatch = useDispatch()

  //const usuarios = useSelector(state=>state.users)
  const usuario = useSelector(state=>state.userLogged)
  //console.log('U:',usuarios)
 
  

  useEffect(()=>{
    dispatch(getBooksAdmin())
  })

  useEffect(()=>{
    dispatch(getAuthorsAdmin())
  })

  return (
    <div className={styles.admin}>
      <div className={styles.containerAdmin}>

        {usuario[0].isAdminData === true ?
        <Link to='/add'>
          <button className={styles.btn}>Agregar Data</button>
        </Link>
        : ''}

        {usuario[0].isAdminData === true ? 
        <Link to='/delete'>
          <button className={styles.btn}>Borrar/Ocultar Data</button>
        </Link>
        : ''}


        {usuario[0].isAdminData === true ?
        <Link to='/put'>
          <button className={styles.btn}>Modificar Data</button>
        </Link>
        : ''}


        {usuario[0].isAdminStock=== true ?
        <Link to='/stock'>
          <button className={styles.btn}>Ver Stock</button>
        </Link>
        : ''}

        {/* <Link to='/adminusers'>
          <button className={styles.btn}>Usuarios</button>
        </Link> */}


{       usuario[0].isAdminUsers === true ?
        <Link to='/adminusers2'>
          <button className={styles.btn}>Usuarios</button>
        </Link>
        : ''}


        {usuario[0].isAdminOrders === true ?
        <Link to='/adminorders'>
          <button className={styles.btn}>Ordenes</button>
        </Link>
        : ''}


        {usuario[0].isAdminMarketing === true ?
        <Link to='/admincarrusel'>
          <button className={styles.btn}>Carrusel</button>
        </Link>
        : ''}
        
      </div>
    </div>
  )
}
