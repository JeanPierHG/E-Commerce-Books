import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";
import { postUser } from "../actions";
import { useEffect } from "react";

export default function Landing() {

  const dispatch = useDispatch()
  const { user } = useAuth0()
  const usuario = useSelector ( state => state.userLogged)

 

  

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>E-commerce Libros</h1>
        <h3 className={styles.frase}>
          Dicen que la felicidad no se puede comprar, pero siempre puedes
          encontrarla en un libro
        </h3>
        {user
        ?<h1>Bienvenido: {user.name}!!!</h1>
        :''}
        <Link to="/home">
          <button className={styles.btn}>¡Vamos!</button>
        </Link>
      </div>
    </div>
  );
}
