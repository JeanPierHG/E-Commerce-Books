import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'

import {
  getBookDetails,
  getBookGenre,
  clearPageBookDetails,
  addToCart,
  addFav,
  getUsers,
} from '../actions'
//import { clearPageBookDetails, getBookDetails } from "../actions";
import { Link } from 'react-router-dom'
import styles from '../Styles/bookDetails.module.css'
import { animateScroll as scroll } from 'react-scroll'
import { useAuth0 } from '@auth0/auth0-react'

export default function BookDetails() {
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector((state) => state.userLogged)
  const { loginWithRedirect } = useAuth0()

  useEffect(() => {
    dispatch(getBookDetails(id))
    scroll.scrollToTop()
  }, [dispatch])

  function handleClick(event, e) {
    event.preventDefault()
    dispatch(getBookGenre(e))
    navigate('/home')
    scroller.scrollTo('gaston')
  }
  function handleAddToCart(e) {
    e.preventDefault()
    dispatch(addToCart(id))
    alert('Libro agregado al carrito!')
  }

  useEffect(() => {
    return () => {
      dispatch(clearPageBookDetails())
    }
  }, [dispatch])

  const handleClickFav = () => {
    if (isLogged.length === 0) return loginWithRedirect()
    const iduser = isLogged[0]._id
    dispatch(addFav(id, iduser))
    alert('Libro agregado a favoritos')
    dispatch(getUsers())
  }

  const book = useSelector((state) => state.bookDetails)
  const author = book.authors

  return (
    <div className={styles.container}>
      <Link to='/cart'>
        <button className={styles.cart}>Ir al Carrito</button>
      </Link>
      <img src={book.cover} alt='Not Found ):' className={styles.img} />

      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>

        {author ? (
          <Link to={'/author/' + author._id}>
            <h2 className={styles.title}>
              {author?.name} {author?.surname}{' '}
            </h2>
          </Link>
        ) : (
          'N'
        )}

        <span>Generos :</span>

        {book?.genres?.map((e) => {
          return (
            <button
              onClick={(event) => handleClick(event, e.genre)}
              className={styles.genres}
            >
              {e.genre}
            </button>
          )
        })}

        <p>{book.review}</p>
      </div>

      <div className={styles.buy}>
        <h3 className={styles.price}>{book.price}$</h3>
        <h4>
          Stock:
          {book.stock > 3
            ? 'Disponible'
            : book.stock === 3
            ? '¡Quedan 3!'
            : book.stock === 2
            ? '¡Quedan 2!'
            : book.stock === 1
            ? '¡Ultimo disponible!'
            : 'No hay Stock'}
        </h4>
        {book.stock > 1
        ? <button className={styles.button} onClick={(e) => handleAddToCart(e)}>
          Añadir al carrito
          </button>
        : ''
        }
        <button className={styles.button} onClick={() => handleClickFav()}>
          Añadir a lista de desesados
        </button>
      </div>

      <div className={styles.details}>
        <h4>Detalles del producto</h4>
        <p className={styles.detail}>Paginas : {book.pages}</p>
        <p className={styles.detail}>Año : {book.year}</p>
        <p className={styles.detail}>Editorial : {book.editorial}</p>
      </div>

      <div className={styles.space} />

      <div className={styles.comments}>
        <label>Da tu puntuacion!</label>
        <input
          type='number'
          placeholder='Puntuacion...'
          className={styles.rating}
        />
        <button>Ok</button>
        <textarea
          cols='80'
          rows='4'
          placeholder='Comenta!'
          className={styles.comment}
        ></textarea>
        <button>Post</button>
      </div>
    </div>
  )
}
