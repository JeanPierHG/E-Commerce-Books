import React from "react";
import styles from '../../Styles/banned.module.css'



export default function Banned(){


    return(
        <div className={styles.container}>

            <h1 className={styles.titulo}>ACCESO DENEGADO!!!!</h1>
            <h3>Su cuenta ha sido bloqueada</h3>
            <h4>Contactate con growup.libros@gmail.com</h4>

        </div>
    )
}