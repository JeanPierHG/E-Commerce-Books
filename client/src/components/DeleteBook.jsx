import React from 'react'
import style from '../Styles/DeleteData.module.css'
import { deleteBook, deleteAuthor, getBooks } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { orderByNameAdminBooks } from '../actions'
import AdminRefreshBooks from './AdminRefreshBooks'
import AdminSearchBarBooks from './AdminSearchBarBooks'
import { showBook , hideBook } from '../actions'

export default function DeleteBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allBooks = useSelector((state) => state.booksAdmin)

  const[ order , setOrder ] = useState( true )

  function handleOrderByName(e) {
    dispatch(orderByNameAdminBooks(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
};

 

  // const orderedBooks = allBooks.sort(function (a, b) {
  //   if (a.title.toLowerCase() > b.title.toLowerCase()) {
  //     return 1
  //   }
  //   if (b.title.toLowerCase() > a.title.toLowerCase()) {
  //     return -1
  //   }
  //   return 0
  // })

  // function handleShowHideBook(id) {
  //   dispatch(showHideBook(id))
  //   alert('Modificado')
  //   navigate('/admin')
  // }

  function handleDeleteBook(id) {
    dispatch(deleteBook(id))
    alert('Libro Eliminado')
    navigate('/admin')
  }

  function ShowBook(id) {
    dispatch(showBook(id))
    setTimeout(function(){
    dispatch(getBooks()),500})
   //alert('Modificado')
   // navigate('/admin')
  }

  function HideBook(id) {
    dispatch(hideBook(id))
    setTimeout(function(){
      dispatch(getBooks()),500})
    
   // alert('Modificado')
  //  navigate('/admin')
  }

  

 

  return (
    <div className={style.containerDelete}>


      <Link to='/delete'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>

      <AdminSearchBarBooks/>
      
      <AdminRefreshBooks/>

      <div>
           <select onChange={e=>handleOrderByName(e)} defaultValue='default'>
                <option value="default" disabled >Orden alfabético</option>
                <option  value="Asc">Nombre Ascendente</option>                     
                <option  value="desc">Nombre Descendente</option>
            </select>
      </div>

      <h1>Borrar Informacion</h1>
      <div className={style.containerItems}>
        <h2>Borrar Libro</h2>
        <ul className={style.grid}>
          {allBooks.length
            ? allBooks.map((book) => {
                return (
                  <li className={style.cardItem}>
                    <img src={book.cover} alt='' />
                    {book.title}

                    {book.isHidden === true?
                    <button onClick={()=> ShowBook(book._id)}>Mostrar</button>
                    :<button onClick={()=> HideBook(book._id)}>Ocultar</button>}

                   

                    <button onClick={() => handleDeleteBook(book._id)}>
                      x
                    </button>
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
