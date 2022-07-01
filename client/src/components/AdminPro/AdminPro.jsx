import React from "react";
import CreateAdmin from "./CreateAdmin";
import { useSelector } from "react-redux";
import styles from '../../Styles/DashboardAdmin.module.css'
import { Link } from "react-router-dom";


export default function AdminPro(){

    //const usuarios = useSelector( state => state.users)
   // console.log('//AdminProU',usuarios)

    return(
        <div className={styles.admin}>
      <div className={styles.containerAdmin}>

        <Link to='/adminproprofile'>
          <button className={styles.btn}>Mi Perfil</button>
        </Link>


         <Link to='/createadmin'>
          <button className={styles.btn}>Permisos de Administrador</button>
         </Link>
        
      </div>
    </div>
    )
}