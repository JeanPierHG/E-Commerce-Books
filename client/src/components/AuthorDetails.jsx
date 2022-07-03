import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart, clearPageAuthorDetails, getAuthorDetails } from '../actions'
import { Link } from 'react-router-dom'
import style from '../Styles/authorDetails.module.css'
import styledButton from '../Styles/Button.module.css'
import { animateScroll as scroll } from 'react-scroll'
import { useState } from 'react'
import CarrouselBookEnAuthor from './CarrouselBooksEnAuthor'
import Fav from './Fav'

const AuthorDetails = () => {
  const dispatch = useDispatch()
  const authorDetails = useSelector((state) => state.authorDetails)
  const books = useSelector((state) => state.books)
  const authorBooks = authorDetails.books

  const { id } = useParams()

  useEffect(() => {
    dispatch(getAuthorDetails(id))
    scroll.scrollToTop()
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearPageAuthorDetails())
    }
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault
    dispatch(addToCart(e.target.value))
    alert('Libro añadido al carrito!')
  }

  return (
    <div className={style.container}>
      <Link to='/cart'>
        <button className={style.cart}>Ir al Carrito</button>
      </Link>
      <div className={style.btnUbi}>
        <Link to='/author'>
          <button className={styledButton.button}>Volver</button>
        </Link>
      </div>
      <div className={style.widthScreen}>
        <div className={style.content}>
          <div>
            <div>
              <h1 className={style.authorName}>
                {authorDetails.name} {authorDetails.surname}
              </h1>
            </div>
            <p>{authorDetails.biography}</p>
          </div>
          <div className={style.info}>
            <div className={style.imageContainer}>
              <img
                className={style.image}
                src={authorDetails.picture}
                alt='buscando img'
              />
            </div>

            <div>
              <p>País: {authorDetails.country}</p>
              <p>Fecha de nacimiento: {authorDetails.birth}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.carrusel}>
        {/* <h5>DEJO CODIGO SIN CARRUSEL POR LAS DUDAS(GUILLE)</h5> */}
        {/* Libros:
                    {
                        authorBooks?.map(book => 
                            <Link to={'/book/' + book._id}>
                                <li>
                                   <h4>{book.title}</h4>
                                   <img src={book.cover}></img>
                                </li>
                            </Link>
                            
                        )    
                    } */}

        {authorBooks && authorBooks.length > 1 ? (
          <CarrouselBookEnAuthor booksEscritor={authorBooks} />
        ) : authorBooks && authorBooks.length ? (
          authorBooks.map((book) => (
            <div className={style.libro}>
              <Link className={style.Link} to={'/book/' + book._id}>
                <li>
                  <h3>{book.title}</h3>
                  <img
                    className={style.img}
                    src={book.cover}
                    alt='Not Found ):'
                    width='200x'
                    height='300'
                  ></img>
                </li>
              </Link>
              <button
                className={styledButton.button}
                value={book._id}
                onClick={(e) => handleClick(e)}
              >
                Añadir al carrito
              </button>
              <div>
                <Fav book={book._id} />
              </div>
            </div>
          ))
        ) : (
          'N'
        )}
      </div>
    </div>
  )
}

export default AuthorDetails
