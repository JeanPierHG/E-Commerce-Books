import React from 'react'
import style from '../../../../Styles/DeleteData.module.css'
import styleButton from '../../../../Styles/Button.module.css'
import { deleteAuthor, getAuthors , getAuthorsAdmin} from '../../../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { orderByNameAdminAuthor } from '../../../../actions'
import AdminSearchBarAuthor from '../../SearchBars/AdminSearchBarAuthor'
import AdminRefreshAuthor from '../../RefreshButtons/AdminRefreshAuthor'
import { showAuthor, hideAuthor } from '../../../../actions'

export default function DeleteAuthor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allAuthors = useSelector((state) => state.authorsAdmin)

  const [order, setOrder] = useState(true)

  function handleOrderByName(e) {
    // e.preventDefault()
    dispatch(orderByNameAdminAuthor(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }


  function handleDeleteAuthor(id) {
    dispatch(deleteAuthor(id))
    alert('Escritor Eliminado')
    setTimeout(function () {
      dispatch(getAuthorsAdmin()), 800
    })
   // navigate('/admin')
  }

  function ShowAuthor(id) {
    dispatch(showAuthor(id))
    setTimeout(function () {
      dispatch(getAuthorsAdmin()), 800
    })
    //getAuthors()
    // navigate('/admin')
  }

  function HideAuthor(id) {
    dispatch(hideAuthor(id))
    setTimeout(function () {
      dispatch(getAuthorsAdmin()), 800
    })
    //getAuthors()
    //navigate('/admin')
  }

  

  return (
    <div className={style.containerDelete}>
      <Link to='/delete'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>

      <AdminSearchBarAuthor />
      <br />
      <AdminRefreshAuthor />
      <br />

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
        <h2>Autores</h2>
        <ul className={style.grid}>
          {allAuthors.length
            ? allAuthors.map((author) => {
                return (
                  <li className={style.cardItem}>
                    <img src={author.picture} alt='' />
                    <p>
                      {author.name} {author.surname}
                    </p>
                    <div className={style.containerButtons}>
                      {author.isHidden === true ? (
                        <button
                          className={styleButton.button}
                          onClick={() => ShowAuthor(author._id)}
                        >
                          Mostrar
                        </button>
                      ) : (
                        <button
                          className={styleButton.button}
                          onClick={() => HideAuthor(author._id)}
                        >
                          Ocultar
                        </button>
                      )}
                      {/* <button onClick={()=> handleShowHideAuthor(author._id)}>
                      {author.isHidden === true
                      ?'MOSTRAR'
                      :'OCULTAR'}
                    </button>
                    */}
                      <button
                        className={style.buttonDelete}
                        onClick={() => handleDeleteAuthor(author._id)}
                      >
                        x
                      </button>
                    </div>
                  </li>
                )
              })
            : 'Resultado no encontrado'}
        </ul>
      </div>

      <Link to='/delete'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
