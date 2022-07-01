import React from 'react'
import style from '../Styles/DeleteData.module.css'
import { deleteAuthor , getAuthors} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { orderByNameAdminAuthor } from '../actions'
import AdminSearchBarAuthor from './AdminSearchBarAuthor'
import AdminRefreshAuthor from './AdminRefreshAuthor'
import { showAuthor , hideAuthor} from '../actions'


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

  function ShowAuthor(id) {
    console.log('SHOW:',id)
    dispatch(showAuthor(id))
    
    alert('Modificado')
    setTimeout(function(){
      dispatch(getAuthors()),500})
   // navigate('/admin')
  }

  function HideAuthor(id) {
    dispatch(hideAuthor(id))
    setTimeout(function(){
      dispatch(getAuthors()),500})
    alert('Modificado')
    //navigate('/admin')
  }


  return (
    <div className={style.containerDelete}>

      <Link to='/delete'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>

      <AdminSearchBarAuthor/>
      
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

                    {author.isHidden === true?
                    <button onClick={()=> ShowAuthor(author._id)}>Mostrar</button>
                    :<button onClick={()=> HideAuthor(author._id)}>Ocultar</button>}
                   
                    {/* <button onClick={()=> handleShowHideAuthor(author._id)}>
                      {author.isHidden === true
                      ?'MOSTRAR'
                      :'OCULTAR'}
                    </button>
                    */}
                    <button onClick={() => handleDeleteAuthor(author._id)}>
                      x
                    </button>

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
