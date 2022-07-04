import React from 'react'
import style from '../../Styles/DeleteData.module.css'
import styledButton from '../../Styles/Button.module.css'
import { deleteBook, deleteAuthor, getBooks } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { orderByNameAdminBooks } from '../../actions'
import AdminRefreshBooks from './AdminRefreshBooks'
import AdminSearchBarBooks from './AdminSearchBarBooks'
import { showBook, hideBook, getBooksAdmin } from '../../actions'

export default function DeleteBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allBooks = useSelector((state) => state.booksAdmin)

  const booksAuthorNoHide = allBooks.filter(
    (book) => book.authors.isHidden === false
  )

  const [order, setOrder] = useState(true)

  function handleOrderByName(e) {
    dispatch(orderByNameAdminBooks(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleDeleteBook(id) {
    dispatch(deleteBook(id))
    alert('Libro Eliminado')
    setTimeout(function () {
      dispatch(getBooksAdmin()), 500
    })
    //navigate('/admin')
  }

  function ShowBook(id) {
    dispatch(showBook(id))
    setTimeout(function () {
      dispatch(getBooksAdmin()), 500
    })
    //alert('Modificado')
    // navigate('/admin')
  }

  function HideBook(id) {
    dispatch(hideBook(id))
    setTimeout(function () {
      dispatch(getBooksAdmin()), 500
    })

    // alert('Modificado')
    //  navigate('/admin')
  }

  return (
    <div className={style.containerDelete}>
      <Link to='/delete'>
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

      <h1>Borrar Informacion</h1>
      <div className={style.containerItems}>
        <h2>Borrar Libro</h2>
        <ul className={style.grid}>
          {booksAuthorNoHide.length
            ? booksAuthorNoHide.map((book) => {
                return (
                  <li className={style.cardItem}>
                    <img src={book.cover} alt='' />
                    <p>{book.title}</p>
                    <div className={style.containerButtons}>
                      {book.isHidden === true ? (
                        <button
                          className={styledButton.button}
                          onClick={() => ShowBook(book._id)}
                        >
                          Mostrar
                        </button>
                      ) : (
                        <button
                          className={styledButton.button}
                          onClick={() => HideBook(book._id)}
                        >
                          Ocultar
                        </button>
                      )}

                      <button
                        className={style.buttonDelete}
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        x
                      </button>
                    </div>
                  </li>
                )
              })
            : 'Resultado inexistente'}
        </ul>
      </div>

      <Link to='/delete'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
