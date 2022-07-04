import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import styles from '../Styles/FAQ.module.css'

export default function FAQ() {
  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Preguntas frecuentes</h1>
      <p className={styles.subtitle}>
        <strong>Acerca de Grow-Up Libros</strong>
      </p>
      <p className={styles.question}>
        ¿Qué beneficios tengo por ser miembro de Grow-Up Libros?
      </p>
      <p className={styles.ask}>
        Por ser miembro de LibrosPG11 vas a poder reseñar y puntuar libros, y
        marcar libros como favoritos para cuando te decidas a comprarlos.
        Además, completando tu perfil vas a poder ver tus libros comprados y
        todo relacionadas con tus gustos e intereses.
      </p>
      <p className={styles.question}>
        ¿Cómo hago para ser miembro de Grow-Up Libros?
      </p>
      <p className={styles.ask}>
        ¡Es muy simple! Registrándote ya sos miembro de Grow-Up Libros. Sólo vas a
        necesitar ingresar tu nombre y apellido, tu mail y una clave.
        ¡Registrarse es totalmente gratuito!
      </p>
      <p className={styles.question}>
        ¿Cómo hago para darme de baja del newsletter?
      </p>
      <p className={styles.ask}>
        Nunca vamos a querer que dejes de recibir los newsletters de Grow-Up Libros,
        pero si en algún momento querés dejar de hacerlo, vas a poder darlo de
        baja ingresando a: Mi cuenta - “Editar perfil” - “Recibir newletter” -
        SI / NO.
      </p>
      <p className={styles.subtitle}>
        <strong>Tienda</strong>
      </p>
      <p className={styles.question}>¿Cómo realizo una compra?</p>
      <p className={styles.ask}>
        Si es tu primera compra, vas a necesitar registrarte completando tu
        mail, nombre, apellido, y contraseña. Si ya estás registrado,
        simplemente vas a tener que loguearte. Una vez que hayas agregado en el
        carrito los libros que te gustan, los pasos a seguir son los siguientes:
        Cliqueá en el botón Comprar. En el siguiente paso vas a poder elegir el
        Método de envío Completá el Domicilio de envío y los datos de
        facturación Por último, cliqueá en el botón Finalizar compra. Y listo.
        ¡Comprar en Grow-Up Libros es rápido e intuitivo, para que pueda empezar a
        leer tu libro preferido cuanto antes!
      </p>
    </div>
  )
}
