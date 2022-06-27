import { useSelector } from 'react-redux'
import React from 'react'
import { Link } from '@mui/material'
import style from '../Styles/Stock.module.css'
export default function Stock() {
  const allBooks = useSelector((state) => state.books)
  const orderedBooks = allBooks.sort(function (a, b) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1
    }
    if (b.title.toLowerCase() > a.title.toLowerCase()) {
      return -1
    }
    return 0
  })

  return (
    <div className={style.stock}>
      <h1>Libros</h1>
      <ul className={style.gridContainerBooks}>
        {orderedBooks.length
          ? orderedBooks.map((book) => {
              return (
                <li className={style.cardItem}>
                  <img src={book.cover} alt='' />
                  <p> {book.title}</p> <p>{book.editorial}</p>{' '}
                  <p>{book.stock}</p>
                </li>
              )
            })
          : 'loading'}
      </ul>
      <Link to='/admin'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
