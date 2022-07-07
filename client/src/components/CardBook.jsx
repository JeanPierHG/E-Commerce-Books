import React, { useState } from "react";
import styles from "../Styles/CardBook.module.css";
import { Link } from "react-router-dom";
import Fav from "./Fav";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, purchaseOrder, putRating, updateAmount } from "../actions";
import { Rating } from "@mui/material";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CardBook({ title, cover, price, rating, id, stock }) {
  const dispatch = useDispatch();
  const { userLogged } = useSelector((state) => state);
  const productsAmount = useSelector((state) => state.cartAmount);
  const products = useSelector((state) => state.cart);
  const { ordersUser } = useSelector((state) => state);

  const { loginWithRedirect } = useAuth0();

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

  function handleAddToCart(e) {
    e.preventDefault();
    if (userLogged.length === 0) return loginWithRedirect();
    dispatch(addToCart(id));
    dispatch(updateAmount(productsAmount + 1));
    alert("Libro agregado al carrito!");
    setTimeout(function () {
      dispatch(
        purchaseOrder({
          email: userLogged[0].email,
          name: userLogged[0].name,
          title: products[products.length - 1].title,
          unit_price: products[products.length - 1].price,
          quantity: products[products.length - 1].amount,
        })
      );
    }, 200);
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
          <div>
            {stock > 1 ? (
              <button
                className={styles.button}
                onClick={(e) => handleAddToCart(e)}
              >
                Añadir al carrito
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
