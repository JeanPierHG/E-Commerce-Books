import { useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../../Styles/Stock.module.css'
import AdminSearchBarBooks from '../../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../../RefreshButtons/AdminRefreshBooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { orderByNameAdminBooks, orderByStockAdminBooks } from '../../../../actions'
import { animateScroll as scroll, Element } from 'react-scroll'
import { useEffect } from 'react'

export default function Stock() {
  const allBooks = useSelector((state) => state.booksAdmin)

  const [order, setOrder] = useState(true)

  const dispatch = useDispatch()

  function handleOrderByName(e) {
    console.log('HHHHH')
    // e.preventDefault()
    dispatch(orderByNameAdminBooks(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleOrderByStock(e) {
    console.log('HHHHH')
    // e.preventDefault()
    dispatch(orderByStockAdminBooks(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  useEffect(() => {
    scroll.scrollToTop()
  }, [])


  return (
    <div className={style.stock}>
      <Link to='/admin'>
        <button className={style.btnAdmin}>Panel Administrador</button>
      </Link>

      <Link to='/stocktable'>
        <button className={style.btnAdmin}>DataGrid</button>
      </Link>

      <Link to='/stocktable2'>
        <button className={style.btnAdmin}>Tabla</button>
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

      <div>
        <select
          className={style.selectOrder}
          onChange={(e) => handleOrderByStock(e)}
          defaultValue='default'
        >
          <option value='default' disabled>
            Orden por Stock
          </option>
          <option value='Asc'>Ascendente</option>
          <option value='desc'>Descendente</option>
        </select>
      </div>

      <h1>Libros</h1>
      <ul className={style.gridContainerBooks}>
        {allBooks.length
          ? allBooks.map((book) => {
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
      <Link to='/stocktable'>
        <button className={style.btnAdmin}> Formato Tabla</button>
      </Link>
      <Link to='/admin'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
