import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, purchaseOrder, updateAmount } from '../actions'
import style from '../Styles/UserPlanLecturaBooks.module.css'
import Fav from './Fav'

const UserPlanLecturaBooks = ({ size, genre, budget }) => {

  const dispatch = useDispatch()
  const allBooks = useSelector((state) => state.books)
  const users = useSelector((state) => state.userLogged)
  const products = useSelector(state => state.cart)
  const productsAmount=useSelector((state)=>state.cartAmount)
  const id = allBooks[0]._id;

  const roundOne = allBooks
    .filter((b) => b.price < '3500')
    .filter((e) => e.pages < '300')
    .filter((p) =>
      p.genres.find((a) => a.genre.includes('Desarrollo Personal'))
    )
    .slice(0, 5)
  console.log('uno', roundOne)

  const roundTwo = allBooks
    .filter((b) => b.price > '3500')
    .filter((e) => e.pages > '300')
    .filter((p) =>
      p.genres.find((a) => a.genre.includes('Desarrollo Personal'))
    )
    .slice(0, 5)

  const roundThree = allBooks
    .filter((b) => b.price < '3500')
    .filter((e) => e.pages > '300')
    .slice(0, 5)

  const roundFour = allBooks
    .filter((b) => b.price > '3500')
    .filter((e) => e.pages < '300')
    .filter((p) =>
      p.genres.find((a) => a.genre.includes('Desarrollo Personal'))
    )
    .slice(0, 5)

  const roundFive = allBooks
    .filter((b) => b.price < '3500')
    .filter((e) => e.pages < '300')
    .filter((p) => p.genres.find((a) => a.genre.includes('Biografia')))
    .slice(0, 5)

  console.log('five', roundFive)

  const roundSix = allBooks
    .filter((b) => b.price > '3500')
    .filter((e) => e.pages > '300')
    .filter((p) => p.genres.find((a) => a.genre.includes('Biografia')))
    .slice(0, 5)

  const roundSeven = allBooks
    .filter((b) => b.price < '3500')
    .filter((e) => e.pages > '300')
    .filter((p) => p.genres.find((a) => a.genre.includes('Biografia')))
    .slice(0, 5)

  const roundEight = allBooks
    .filter((b) => b.price > '3500')
    .filter((e) => e.pages < '300')
    .filter((p) => p.genres.find((a) => a.genre.includes('Biografia')))
    .slice(0, 5)

    const handleAddToCart = (e) => {
      e.preventDefault()
      if (users.length === 0) return loginWithRedirect()
      dispatch(addToCart(e.target.value))
      dispatch(updateAmount(productsAmount+1))
      alert('Libro agregado al carrito!')
      setTimeout(function(){
      
        dispatch(purchaseOrder({
          email: users[0].email, 
          name: users[0].name,
          title: products[products.length-1].title,
          unit_price: products[products.length-1].price, 
          quantity: products[products.length-1].amount,
        }))
         
      }, 200)
    }

  return (
    <div className={style.containerBooksRecommended}>
      {size == 'cortos' &&
      budget == 'Menos de $3.500' &&
      genre == 'Desarrollo Personal' ? (
        roundOne?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'largos' &&
        budget == 'Más de $3.500' &&
        genre == 'Desarrollo Personal' ? (
        roundTwo?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'cortos' &&
        budget == 'Más de $3.500' &&
        genre == 'Desarrollo Personal' ? (
        roundThree?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'largos' &&
        budget == 'Menos de $3.500' &&
        genre == 'Desarrollo Personal' ? (
        roundFour?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'cortos' &&
        budget == 'Menos de $3.500' &&
        genre == 'Negocios y Biografía' ? (
        roundFive?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'largos' &&
        budget == 'Más de $3.500' &&
        genre == 'Negocios y Biografía' ? (
        roundSix?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'cortos' &&
        budget == 'Más de $3.500' &&
        genre == 'Negocios y Biografía' ? (
        roundSeven?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : size == 'largos' &&
        budget == 'Menos de $3.500' &&
        genre == 'Negocios y Biografía' ? (
        roundEight?.map((e) => (
          <li>
            <Link to={"/book/" + e._id}>
              <img className={style.container} src={e.cover} alt='buscando' />
            </Link>
            <button value={e._id} onClick={(e) => handleAddToCart(e)}>
              Añadir al carrito
            </button>
            <span>
              <Fav book={e._id} />
            </span>
          </li>
        ))
      ) : (
        <p>No se encontraron libros sugeridos</p>
      )}
    </div>
  )
}

export default UserPlanLecturaBooks;


