import React from "react";
import styles from "../Styles/CardBook.module.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {Link} from "react-router-dom";
import Fav from "./Fav";

export default function CardBook({ title, cover, price, rating, id }) {
  return (
    <div className={styles.container}>
      <Link to={'/book/' + id}>
        <img
          className={styles.img}
          src={cover}
          alt="Not Found ):"
          width="200x"
          height="300"
        />
      </Link>
      <div className={styles.block}>
        <h2>{title}</h2>
        <div className={styles.info}>
          <div className={styles.containerRating}>
            <AutoAwesomeIcon className={styles.ratingIcon} />
            <p className={styles.rating}>{rating}</p>
          </div>
          <span>
            <Fav book={id}/>
          </span>
          <p className={styles.price}>${price}</p>
        </div>
      </div>
    </div>
  );
}
