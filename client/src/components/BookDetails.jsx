import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import { BsCart } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import axios from 'axios'

import {
  getBookDetails,
  getBookGenre,
  clearPageBookDetails,
  addToCart,
  addFav,
  getUsers,
  updateAmount,
  purchaseOrder,
  getBookComments,
  clearComments,
  changeGenreTitle,
} from '../actions'

import { Link } from 'react-router-dom'
import styles from '../Styles/bookDetails.module.css'
import s from '../Styles/Home.module.css'
import { animateScroll as scroll } from 'react-scroll'
import { useAuth0 } from '@auth0/auth0-react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Fav from './Fav'
import Alert from '../functions/Alert'

export default function BookDetails() {
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productsAmount = useSelector((state) => state.cartAmount)
  const isLogged = useSelector((state) => state.userLogged)
  const products = useSelector((state) => state.cart)
  const { loginWithRedirect } = useAuth0()
  const [render, setRender] = useState(0)
  const usuario = useSelector((state) => state.userLogged)

  const uBooksFav = useSelector((state) => state.userLoggedFavsBooksShowed)
  //console.log('uBooksFavs:',uBooksFav)

  const bookAdded = uBooksFav.filter((e) => e._id === id)
  // console.log('bookAdded:,',bookAdded)

  const [comment, setComment] = useState({
    comment: '',
    nickname: '',
    title: '',
  })

  useEffect(() => {
    dispatch(getBookDetails(id))
    dispatch(getBookComments(id))
    scroll.scrollToTop()
  }, [dispatch])

  function handleClick(event, e) {
    event.preventDefault()
    dispatch(getBookGenre(e))
    dispatch(changeGenreTitle(e))
    navigate('/home')
    scroller.scrollTo('gaston')
  }
  function handleAddToCart(e) {
    e.preventDefault()
    if (isLogged.length === 0) return loginWithRedirect()
    dispatch(addToCart(id))
    dispatch(updateAmount(productsAmount + 1))
    setTimeout(function () {
      dispatch(
        purchaseOrder({
          email: isLogged[0].email,
          name: isLogged[0].name,
          title: products[products.length - 1].title,
          unit_price: products[products.length - 1].price,
          quantity: products[products.length - 1].amount,
        })
      )
    }, 500)
  }

  useEffect(() => {
    return () => {
      dispatch(clearPageBookDetails())
      dispatch(clearComments())
    }
  }, [dispatch])

  /* const handleClickFav = () => {
   
    if (isLogged.length === 0) return loginWithRedirect()
    if (bookAdded.length) return alert('Ya es un libro favorito');
     const iduser = isLogged[0]._id
    dispatch(addFav(id, iduser))
    alert('Libro agregado a favoritos')
    dispatch(getUsers())
  } */

  function handleChange(e) {
    e.preventDefault()
    setComment({
      comment: e.target.value,
      nickname: usuario[0].nickname,
      title: book.title,
    })
    console.log('comment :', comment)
  }
  function handlePost(e) {
    e.preventDefault()
    console.log('comment :', comment)
    axios
      .post(
        'https://ecommercehenryx.herokuapp.com/comments/addComment',
        comment
      )
      .then((response) => {
        console.log('axios response', response)
      })
      .then(() => {
        setTimeout(function () {
          dispatch(getBookComments(id)), 500
        })
      })
  }

  function handleDelete(e) {
    e.preventDefault()
    axios
      .delete(
        'https://ecommercehenryx.herokuapp.com/comments/deleteComment/' +
          e.target.value
      )
      .then(() => {
        setTimeout(function () {
          dispatch(getBookComments(id)), 500
        })
      })
  }

  const book = useSelector((state) => state.bookDetails)
  const comments = useSelector((state) => state.comments)
  console.log('comments:', comments)
  const author = book.authors

  return (
    <div className={s.container}>
      <Link to='/cart'>
        <div className={s.containerCart}>
          <BsCart className={s.cart} />
          <div className={s.productsAmount}>
            <p className={s.productsAmountNumber}>{productsAmount}</p>
          </div>
        </div>
      </Link>

      <Link to='/user'>
        <div className={s.containerHeart}>
          <BsHeart className={s.heart} />
          {isLogged.length ? (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>{uBooksFav.length}</p>
            </div>
          ) : (
            <div className={s.productsAmount}>
              <p className={s.productsAmountNumber}>{0}</p>
            </div>
          )}
        </div>
      </Link>
      <div className={styles.principal}>
        <img src={book.cover} alt='Not Found ):' className={styles.img} />
        <h1 className={styles.title}>{book.title}</h1>
        <label>Autor :</label>
        {author ? (
          <Link to={'/author/' + author._id}>
            <span className={styles.author}>
              {author?.name} {author?.surname}{' '}
            </span>
          </Link>
        ) : (
          'N'
        )}
        <div className={styles.buy}>
          <h3 className={styles.price}>${book.price}</h3>
          <h4>
            Stock :
            {book.stock > 3
              ? ' Disponible'
              : book.stock === 3
              ? ' ¡Quedan 3!'
              : book.stock === 2
              ? ' ¡Quedan 2!'
              : book.stock === 1
              ? ' ¡Ultimo disponible!'
              : ' No hay Stock'}
          </h4>
          {book.stock > 0 ? (
            <div className={styles.iconBackground}>
              <AddShoppingCartIcon
                cursor='pointer'
                color='action'
                fontSize='large'
                onClick={(e) => handleAddToCart(e)}
              />
            </div>
          ) : (
            ''
          )}
          <div className={styles.iconBackground}>
            <Fav
              book={book._id}
              painted={`${
                bookAdded.includes(book._id) ? 'secondary' : 'disabled'
              }`}
            />
          </div>
          {/* <button className={styles.button} onClick={() => handleClickFav()}>
          Añadir a lista de desesados
        </button> */}
        </div>

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
      </div>

      <div className={styles.separador} />

      <div className={styles.reviewContainer}>
        <h2 className={styles.title}>Reseña del libro</h2>
        <p>{book.review}</p>
      </div>

      <div className={styles.separador} />

      <div className={styles.details}>
        <h4>Detalles del producto</h4>
        <p className={styles.detail}>Paginas : {book.pages}</p>
        <p className={styles.detail}>Año : {book.year}</p>
        <p className={styles.detail}>Editorial : {book.editorial}</p>
      </div>

      <div className={styles.separador} />

      <div className={styles.postComments}>
        {isLogged.length === 0 ? (
          <button className={styles.login} onClick={() => loginWithRedirect()}>
            Ingresa a tu cuenta para comentar
          </button>
        ) : (
          <textarea
            cols='80'
            rows='4'
            placeholder='Comenta!'
            className={styles.textArea}
            value={comment.comment}
            onChange={(e) => handleChange(e)}
          ></textarea>
        )}

        {isLogged.length === 0 ? null : (
          <button onClick={(e) => handlePost(e)} className={styles.postButton}>
            {'>'}
          </button>
        )}
      </div>
      {comments.map((e) => {
        if (e.users.length > 0) {
          if (e.isHidden===false){
          return (
            <div className={styles.commentContainer}>
              {e.users[0]._id === usuario[0]?._id ? (
                <button
                  value={e._id}
                  onClick={(e) => handleDelete(e)}
                  className={styles.delete}
                >
                  x
                </button>
              ) : null}
              <span className={styles.nickname}>{e.users[0].nickname}</span>
              <span>{e.createdAt?.slice(0, 10)}</span>
              <p>{e.comment}</p>
            </div>
          )}
        }
      })}
      <div className={styles.space} />
    </div>
  )
}

/* 
<button className={styles.button} onClick={(e) => handleAddToCart(e)}>
            Añadir al carrito
            </button>
*/
