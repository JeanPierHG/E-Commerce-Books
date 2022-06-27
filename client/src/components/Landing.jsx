import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>E-commerce Libros</h1>
        <h3 className={styles.frase}>
          Dicen que la felicidad no se puede comprar, pero siempre puedes
          encontrarla en un libro
        </h3>
        <Link to="/home">
          <button className={styles.btn}>¡Vamos!</button>
        </Link>
      </div>
    </div>
  );
}
