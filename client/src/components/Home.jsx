import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../actions";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import Paginado from "./Paginado";
import CardBook from "./CardBook";
import Carousel from "./carousel";

export default function Home() {
  
  const dispatch = useDispatch();
  
  const allBooks = useSelector((state) => state.books);
  
  const handleClick = (e) => {
        e.preventDefault();
        dispatch(getBooks());
    }
  
  const [order, setOrder] = useState("Asc");
  /* const [rating, setRating] = useState(""); */
  const [price, setPrice] = useState("");
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage] = useState(10);
  var lastBook = currentPage * bookPerPage;
  var firstBook = lastBook - bookPerPage;
  var currentBooks = allBooks.slice(firstBook, lastBook);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  useEffect(() => {
    setCurrentPage(1);
    lastBook = currentPage * bookPerPage;
    firstBook = lastBook - bookPerPage;
    currentBooks = allBooks.slice(firstBook, lastBook);
  }, [allBooks]);
 

  useEffect(() => {
    dispatch(getBooks("Asc"));
  }, [dispatch]);

  function handleSort(e) {
    setOrder(e.target.value);
    dispatch(getBooks(e.target.value));
    setCurrentPage(1);
  }
           
  /* function handleRating(e) {
    setRating(e.target.value);
    dispatch(getBooks(order, e.target.value));
    setCurrentPage(1);
  } */


 function handlePrice(e) {
    setPrice(e.target.value);
    dispatch(getBooks(order, e.target.value));
    setCurrentPage(1);
  }



return(
    
    <div>

        <Link to="/add">
            <button>Add</button>
        </Link>

        <p onClick={handleClick}>Refrescar</p>

        <SideBar />
  
        <Carousel/>
  
      <div>

        <Paginado
          bookPerPage={bookPerPage}
          books1={allBooks.length}
          paginado={paginado}
          page={currentPage}
        />

        <div>
           
          <p>
            Ordenar Por:

            <select onChange={(e) => handleSort(e)}>
              <option value="Asc">Nombre Ascendente</option>
              <option value="desc">Nombre Descendente</option>
            </select>

            {/* <select onChange={(e) => handleRating(e)}>
              <option value="Asc">Higher Rating</option>
              <option value="desc">Lower Rating</option>
            </select> */}

            <select onChange={(e) => handlePrice(e)}>
              <option value="Asc">Precio mas Bajo</option>
              <option value="desc">Precio mas Alto</option>
            </select>
          </p>

        </div>

        {currentBooks.length ? (
            currentBooks.map((book, index) => {
              return (
                <div key={index}>
                  <Link to={"/book/" + book._id}>
                    <CardBook
                      title={book.title}
                      cover={book.cover}
                      price={book.price}
                      rating={book.rating}
                      id={book._id}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <h5>No se encontro el libro</h5>
          )}

        <BottomBar />

       </div>

    </div>
)

}
