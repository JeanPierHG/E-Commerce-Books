import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from '../Styles/PutBook.module.css'

export default function PutBook() {
  const allBooks = useSelector((state) => state.books)
  const ordereBooks = allBooks.sort(function (a, b) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1
    }
    if (b.title.toLowerCase() > a.title.toLowerCase()) {
      return -1
    }
    return 0
  })

  return (
    <div className={style.containerPutList}>
      <h1>Libros</h1>
      <div className={style.grid}>
        {ordereBooks.map((book) => {
          return (
            <div className={style.cardItem}>
              <h5>{book.title} </h5>
              <img src={book.cover} alt='' />
              <Link to={'/putBookID/' + book._id}>
                <button className={style.btn}>Modificar</button>
              </Link>
            </div>
          )
        })}
      </div>

      <Link to='/admin'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
