import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../actions";
import { Link } from "react-router-dom";

export default function BookDetails() {
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetails(id));
  }, [dispatch]);

  const book = useSelector((state) => state.bookDetails);
  return (
    <div>
      <h2>{book.title}</h2>
      <Link to="/Home">
        <h3>Home</h3>
      </Link>
      <img src={book.cover} alt="Not Found ):" width="300px" />
      <h3>Autor: {book.author}</h3>
      <h4>Rating: {book.rating}</h4>
      <p>editorial : {book.editorial}</p>
      <span>generos :</span>

      {book?.genres?.map((e) => {
        return <span key={e}>{e}, </span>;
      })}
      <p>Paginas : {book.pages}</p>
      <p>Precio : {book.price}$</p>
      <p>Año : {book.year}</p>
      <p>{book.review}</p>
      <button>Comprar({book.price}$)</button>
      <input type="number" placeholder="Puntuacion..." />
      <textarea cols="30" rows="10" placeholder="Comenta!"></textarea>
    </div>
  );
}
