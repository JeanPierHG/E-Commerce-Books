import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { putBook } from '../../../../actions'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import style from '../../../../Styles/PutBookID.module.css'
import { getBooks } from '../../../../actions'


export default function PutBookId() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id

  const allBooks = useSelector((state) => state.books)

  const bookId = allBooks.filter((book) => book._id === id)

  const [post, setPost] = useState({
    title: '',
    cover: '',
    rating: '',
    year: '',
    pages: '',
    editorial: '',
    price: '',
    stock: '',
    review: '',
  })

  useEffect(() => {
    setPost({
      ...post,
      title: bookId[0].title,
      cover: bookId[0].cover,
      rating: bookId[0].rating,
      year: bookId[0].year,
      pages: bookId[0].pages,
      editorial: bookId[0].editorial,
      price: bookId[0].price,
      stock: bookId[0].stock,
      review: bookId[0].review,
    })
  }, [])

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(putBook(post, id))
    alert('¡Libro Modificado!')
    setTimeout(function(){
      dispatch(getBooks())
    }, 1000);
    navigate('/put')
  }

  return (
    <div className={style.form}>
      <h1 className={style.titleForm}>Modifica el Libro</h1>
      <form className={style.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Titulo:</label>
          <input
            type='text'
            value={post.title}
            name='title'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Editorial:</label>
          <input
            type='text'
            value={post.editorial}
            name='editorial'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type='text'
            value={post.cover}
            name='cover'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Rating:</label>
          <input
            type='number'
            min='0'
            max='10'
            value={post.rating}
            name='rating'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Año:</label>
          <input
            type='number'
            value={post.year}
            name='year'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Cantidad de paginas:</label>
          <input
            type='number'
            value={post.pages}
            name='pages'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type='number'
            value={post.price}
            name='price'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type='number'
            value={post.stock}
            name='stock'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Reseña</label>
          <textarea
            value={post.review}
            name='review'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button className={style.btn} type='submit'>
          Modificar Libro
        </button>
      </form>

      <Link to='/putBook'>
        <button className={`${style.btnAdmin}`}>↼ Back</button>
      </Link>
    </div>
  )
}
