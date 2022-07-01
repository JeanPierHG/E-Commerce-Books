import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import Paginado from "./Paginado";
import CardBook from "./CardBook";
import Carousel from "./Carousel";
import styles from "../Styles/Home.module.css";
import { Admin } from "./Admin";
import OrderBooks from "./OrderBooks";
import { animateScroll as scroll, Element } from "react-scroll";
import { getBooks, orderByName, orderByPrice, postUser } from "../actions";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import AdminPro from "./AdminPro/AdminPro";
import NavBarAdmin from "./NavBarAdmin";

export default function Home() {
  const dispatch = useDispatch()

  const {user, isAuthenticated } = useAuth0()
 

 

  const allBooks = useSelector((state) => state.books);

  const usuario = useSelector((state)=>state.userLogged)
  
  

  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage] = useState(8);
  var lastBook = currentPage * bookPerPage;
  var firstBook = lastBook - bookPerPage;
  var currentBooks = allBooks.slice(firstBook, lastBook);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    lastBook = currentPage * bookPerPage;
    firstBook = lastBook - bookPerPage;
    currentBooks = allBooks.slice(firstBook, lastBook);
  }, [allBooks]);

  const [order, setOrder] = useState(true);

  function handleOrderByName(e) {

     //console.log('HHHHH')
     // e.preventDefault()
     dispatch(orderByName(e.target.value))
     setCurrentPage(1)
     setOrder(`Ordenado ${e.target.value}`)
 };
 
 function handleOrderByPrice(e) {
     //e.preventDefault()
     dispatch(orderByPrice(e.target.value))
    setCurrentPage(1)
     setOrder(`Ordenado ${e.target.value}`)
 };


  {useEffect(()=>{if(user){
    dispatch(postUser(user))}

  },[user])}



return (
  <div className={styles.home}>
    <div className={styles.color}>




    <Link to='/cart'><button className={styles.cart}>Ir al Carrito</button></Link>


    

   
      <Carousel />

      <div>
       
        <div className={styles.ubiOptions}>
          <p className={styles.p}>Ordenar Por:

            <select className={styles.options} onChange={e=>handleOrderByName(e)} defaultValue='default'>
                <option value="default" disabled >Orden alfabético</option>
                <option className={styles.options} value="Asc">Nombre Ascendente</option>                     <option className={styles.options} value="desc">Nombre Descendente</option>
            </select>
           
            <select className={styles.options} onChange={e=>handleOrderByPrice(e)} defaultValue='default'>
                <option  value="default" disabled >Orden por precio</option>
                <option className={styles.options} value="desc">Precio mas Bajo</option>
                <option className={styles.options} value="Asc">Precio mas Alto</option>
            </select>
          </p>
        </div>
        
         <Element name='gaston'>
        <Paginado
            bookPerPage={bookPerPage}
           books1={allBooks.length}
           paginado={paginado}
            page={currentPage}
        />      
        </Element>


       
        <div className={styles.sideBar_containerCard}>
        <div className={styles.card}>
             {currentBooks.length ? (
               currentBooks.map((book, index) => {
                 return (
                   <div key={index}>
                     <div className={styles.link} > 
                       <CardBook
                         title={book.title}
                         cover={book.cover}
                         price={book.price}
                         rating={book.rating}
                         id={book._id}
                       />
                     </div>
                   </div>
                 )
               })
             ) : (
               <h5>No se encontro el libro</h5>             
          )}
        </div>

            <SideBar />

          </div>

          <Paginado
            bookPerPage={bookPerPage}
            books1={allBooks.length}
            paginado={paginado}
            page={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
 



