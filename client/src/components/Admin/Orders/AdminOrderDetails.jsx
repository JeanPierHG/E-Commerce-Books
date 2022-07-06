import React from "react";
import { useSelector } from "react-redux";
import styles from '../../../Styles/adminUserProfile.module.css'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AdminOrderDetails(){

    const id = useParams().id
    console.log('I:',id)

    const allOrders = useSelector(state=>state.orders)

    const order = allOrders.filter((order) => order._id === id)[0]




    return(
        <div className={styles.containerAdminProfile}>

        <NavLink className={` ${styles.buttonBack}`} to='/adminorders'>
                  <button className={`${styles.button} `}>Volver</button>
          </NavLink>

        <div className={styles.containerAdmin}>
         <h1>Detalles de Orden</h1>
            <p className={styles.h2}>Orden Id: {order._id}</p>
           
                 <Link to={`/adminuserprofile/${order.usuario[0]._id}`}>
                          {order.usuario[0].email}
                </Link>
            <p className={styles.h2}>Fecha: {order.fecha}</p>
            <p className={styles.h2}>Total precio : {order.total}</p>
            <p className={styles.h2}>Producto: {order.produt}</p>
            <p className={styles.h2}>Cantidad: {order.quantity}</p>
            <p className={styles.h2}>Direccion: {order.usuario[0].address}</p>
            <p className={styles.h2}>Estado de Pago: {order.phone}</p>
            <p className={styles.h2}>Estado de Orden: {order.status}</p>
      
            </div>
        </div>
    )
}

//CAMBIAR EL ESTADO