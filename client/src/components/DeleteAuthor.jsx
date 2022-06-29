import React from 'react'
import style from '../Styles/DeleteData.module.css'
import { deleteBook, deleteAuthor } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { orderByNameAdminAuthor } from '../actions'
import SearchBarAdminAuthor from './SearchBarAdminAuthor'
import AdminRefresh from './AdminRefreshBooks'
import AdminRefreshAuthor from './AdminRefreshAuthor'

export default function DeleteAuthor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const allAuthors = useSelector((state) => state.authorsAdmin)

  const[ order , setOrder ] = useState( true )


  function handleOrderByName(e) {
    console.log('HHHHH')
    // e.preventDefault()
    dispatch(orderByNameAdminAuthor(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
};
  





//   const orderedAuthors = allAuthors.sort(function (a, b) {
//     if (a.name.toLowerCase() > b.name.toLowerCase()) {
//       return 1
//     }
//     if (b.name.toLowerCase() > a.name.toLowerCase()) {
//       return -1
//     }
//     return 0
//   })

 
  function handleDeleteAuthor(id) {
    dispatch(deleteAuthor(id))
    alert('Escritor Eliminado')
    navigate('/admin')
  }

  console.log(allAuthors)


  return (
    <div className={style.containerDelete}>

      <SearchBarAdminAuthor/>
      
      <AdminRefreshAuthor/>
      

        <div>
           <select onChange={e=>handleOrderByName(e)} defaultValue='default'>
                <option value="default" disabled >Orden alfabético</option>
                <option  value="Asc">Nombre Ascendente</option>                     
                <option  value="desc">Nombre Descendente</option>
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
                    {author.name} {author.surname}
                    <button onClick={() => handleDeleteAuthor(author._id)}>
                      x
                    </button>
                  </li>
                )
              })
            : 'Resultado no encontrado'}
        </ul>
      </div>

      <Link to='/admin'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
