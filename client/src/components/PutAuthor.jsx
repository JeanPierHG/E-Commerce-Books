import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from '../Styles/PutAuthor.module.css'
import { orderByNameAdminAuthor } from '../actions'
import SearchBarAdminAuthor from './SearchBarAdminAuthor'
import AdminRefreshAuthor from './AdminRefreshAuthor'



export default function PutAuthor() {
  

  
  const allAuthors = useSelector((state) => state.authorsAdmin)

  const[ order , setOrder ] = useState( true )

  const dispatch = useDispatch()

  // const orderedAuthors = allAuthors.sort(function (a, b) {
  //   if (a.name.toLowerCase() > b.name.toLowerCase()) {
  //     return 1
  //   }
  //   if (b.name.toLowerCase() > a.name.toLowerCase()) {
  //     return -1
  //   }
  //   return 0
  // })

  function handleOrderByName(e) {
    console.log('HHHHH')
    // e.preventDefault()
    dispatch(orderByNameAdminAuthor(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
};

  return (
    <div className={style.containerPutList}>

      <SearchBarAdminAuthor/>
      
      <AdminRefreshAuthor/>

      <div>
           <select onChange={e=>handleOrderByName(e)} defaultValue='default'>
                <option value="default" disabled >Orden alfabético</option>
                <option  value="Asc">Nombre Ascendente</option>                     
                <option  value="desc">Nombre Descendente</option>
            </select>
      </div>
      <h1>Autores</h1>
      <div className={style.grid}>
        {allAuthors.length
        ? allAuthors.map((author) => {
          return (
            <div className={style.cardItem}>
              <h5>
                {author.name} {author.surname}
              </h5>
              <img src={author.picture} alt='' />
              <Link to={'/putAuthorID/' + author._id}>
                <button className={style.btn}>Modificar</button>
              </Link>
            </div>
          )
        })
      :'Resultado inexistente'}
      </div>
      <Link to='/put'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
