import React, { useState } from "react";
import styles from "../Styles/CardBook.module.css";
import { Link } from "react-router-dom";
import Fav from "./Fav";
import { useDispatch, useSelector } from "react-redux";
import { putRating } from "../actions";
import { Rating } from "@mui/material";
import { useEffect } from "react";

export default function CardBook({ title, cover, price, rating, id }) {
  const dispatch = useDispatch();
  const { userLogged } = useSelector((state) => state);
  //const [ifRating, setIfRating] = useState();
  const ifRating = changeRating(id);
  const isBuy = changeBuy(id);

  function changeBuy(id) {
    if (userLogged.length > 0 && userLogged[0].buyBooks.length > 0) {
      let result = userLogged[0].buyBooks.indexOf(id);
      if (result === -1) {
        return false;
      } else {
        return true;
      }
    }
  }

  function changeRating(id) {
    if (userLogged.length > 0 && userLogged[0].ratingBooks.length > 0) {
      let result = userLogged[0].ratingBooks.indexOf(id);
      if (result === -1) {
        return false;
      } else {
        return true;
      }
    }
    if (userLogged.length === 0) {
      return true;
    }
  }

  function handleRating(event, value) {
    dispatch(putRating(id, value, userLogged[0]._id));
    // setIfRating(true);
  }

  return (
    <div className={styles.container}>
      <Link to={"/book/" + id}>
        <div className={styles.portada}>
          <img
            className={styles.img}
            src={cover}
            alt="Not Found ):"
            width="200x"
            height="300"
          />
          <div
            className={
              isBuy ? styles.comprado + " " + styles.show : styles.comprado
            }
          >
            <span>COMPRADO</span>
          </div>
        </div>
      </Link>
      <div className={styles.block}>
        <h2>{title}</h2>
        <div className={styles.rating}>
          {ifRating ? (
            <Rating
              name="half-rating"
              value={rating}
              precision={0.5}
              onChange={(event, value) => handleRating(event, value)}
              readOnly
            />
          ) : (
            <Rating
              name="half-rating"
              value={0}
              precision={0.5}
              onChange={(event, value) => handleRating(event, value)}
            />
          )}
          <span className={styles.numberRating}>{rating.toFixed(2)}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.containerRating}>
            <span>
              <Fav book={id} />
            </span>
            <p className={styles.price}>${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
