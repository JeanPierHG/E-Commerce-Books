import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from '../Styles/PutAuthor.module.css'
export default function PutAuthor() {
  const allAuthors = useSelector((state) => state.authors)
  const orderedAuthors = allAuthors.sort(function (a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1
    }
    if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1
    }
    return 0
  })

  return (
    <div className={style.containerPutList}>
      <h1>Autores</h1>
      <div className={style.grid}>
        {orderedAuthors.map((author) => {
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
        })}
      </div>
      <Link to='/put'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
