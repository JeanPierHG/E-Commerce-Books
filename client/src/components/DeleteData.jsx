import React from 'react'
import style from '../Styles/DeleteData.module.css'
import { deleteBook, deleteAuthor } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Delete() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allBooks = useSelector((state) => state.books)
  const allAuthors = useSelector((state) => state.authors)

  const orderedBooks = allBooks.sort(function (a, b) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1
    }
    if (b.title.toLowerCase() > a.title.toLowerCase()) {
      return -1
    }
    return 0
  })

  const orderedAuthors = allAuthors.sort(function (a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1
    }
    if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1
    }
    return 0
  })

  function handleDeleteBook(id) {
    dispatch(deleteBook(id))
    alert('Libro Eliminado')
    navigate('/admin')
  }

  function handleDeleteAuthor(id) {
    dispatch(deleteAuthor(id))
    alert('Escritor Eliminado')
    navigate('/admin')
  }

  console.log(allAuthors)
  console.log(allBooks)

  return (
    <div className={style.containerDelete}>
      <h1>Borrar Informacion</h1>
      <div className={style.containerItems}>
        <h2>Borrar Libro</h2>
        <ul className={style.grid}>
          {orderedBooks.length
            ? orderedBooks.map((book) => {
                return (
                  <li className={style.cardItem}>
                    <img src={book.cover} alt='' />
                    {book.title}
                    <button onClick={() => handleDeleteBook(book._id)}>
                      x
                    </button>
                  </li>
                )
              })
            : 'loading'}
        </ul>
      </div>

      <div className={style.containerItems}>
        <h2>Autores</h2>
        <ul className={style.grid}>
          {orderedAuthors.length
            ? orderedAuthors.map((author) => {
                return (
                  <li className={style.cardItem}>
                    <img src={author.picture} alt='' />
                    {author.name} {author.surname}
                    <button onClick={() => handleDeleteAuthor(author._id)}>
                      x
                    </button>
                  </li>
                )
              })
            : 'loading'}
        </ul>
      </div>

      <Link to='/admin'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
