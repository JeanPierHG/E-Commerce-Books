import React from "react";
import styles from "../Styles/CardBook.module.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link } from "react-router-dom";
import Fav from "./Fav";
import { useDispatch, useSelector } from "react-redux";
import { putRating } from "../actions";

export default function CardBook({ title, cover, price, rating, id }) {
  const dispatch = useDispatch();
  const { userLogged } = useSelector((state) => state);
  console.log("Usuario logueado:", userLogged);

  function handleRating(value) {
    dispatch(putRating(id, value, userLogged.id));
  }

  return (
    <div className={styles.container}>
      <Link to={"/book/" + id}>
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
        <div className={styles.estrellas}>
          <a onClick={() => handleRating(1)}>⭐</a>
          <a onClick={() => handleRating(2)}>⭐</a>
          <a onClick={() => handleRating(3)}>⭐</a>
          <a onClick={() => handleRating(4)}>⭐</a>
          <a onClick={() => handleRating(5)}>⭐</a>
        </div>
        <div className={styles.info}>
          <div className={styles.containerRating}>
            <AutoAwesomeIcon className={styles.ratingIcon} />
            <p className={styles.rating}>{rating}</p>
          </div>
          <span>
            <Fav book={id} />
          </span>
          <p className={styles.price}>${price}</p>
        </div>
      </div>
    </div>
  );
}
