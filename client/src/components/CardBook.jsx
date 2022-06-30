import React from "react";
import styles from "../Styles/CardBook.module.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
export default function CardBook({ title, cover, price, rating }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={cover}
        alt="Not Found ):"
        width="200x"
        height="300"
      />
      <div className={styles.block}>
        <h2>{title}</h2>
        <div className={styles.estrellas}>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
        </div>
        <div className={styles.info}>
          <div className={styles.containerRating}>
            <AutoAwesomeIcon className={styles.ratingIcon} />
            <p className={styles.rating}>{rating}</p>
          </div>
          <p className={styles.price}>{price}$</p>
        </div>
      </div>
    </div>
  );
}
