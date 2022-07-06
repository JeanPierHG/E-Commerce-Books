import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from '../../../../Styles/PutBook.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { orderByNameAdminBooks } from '../../../../actions'
import AdminSearchBarBooks from '../../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../../RefreshButtons/AdminRefreshBooks'

export default function PutBook() {
  const allBooks = useSelector((state) => state.booksAdmin)

  const [order, setOrder] = useState(true)

  const dispatch = useDispatch()

  function handleOrderByName(e) {
    console.log('HHHHH')
    // e.preventDefault()
    dispatch(orderByNameAdminBooks(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  // const ordereBooks = allBooks.sort(function (a, b) {
  //   if (a.title.toLowerCase() > b.title.toLowerCase()) {
  //     return 1
  //   }
  //   if (b.title.toLowerCase() > a.title.toLowerCase()) {
  //     return -1
  //   }
  //   return 0
  // })

  return (
    <div className={style.containerPutList}>
      <Link to='/put'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>

      <AdminSearchBarBooks />

      <AdminRefreshBooks />

      <div>
        <select
          className={style.selectOrder}
          onChange={(e) => handleOrderByName(e)}
          defaultValue='default'
        >
          <option value='default' disabled>
            Orden alfabético
          </option>
          <option value='Asc'>Nombre Ascendente</option>
          <option value='desc'>Nombre Descendente</option>
        </select>
      </div>

      <h1>Libros</h1>
      <div className={style.grid}>
        {allBooks.length
          ? allBooks.map((book) => {
              return (
                <div className={style.cardItem}>
                  <h5>{book.title} </h5>
                  <img src={book.cover} alt='' />
                  <Link to={'/putBookID/' + book._id}>
                    <button className={style.btn}>Modificar</button>
                  </Link>
                </div>
              )
            })
          : 'Resultado inexistente'}
      </div>

      <Link to='/put'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
