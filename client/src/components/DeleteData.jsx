import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Styles/Put.module.css'


export default function DeleteData() {
  return (
    <div className={style.put}>
      <div className={style.containerPut}>
        <div className={style.actionsButtons}>
          
          <Link to='/deleteauthor'>
            <button className={style.btn}>Borrar Autor</button>
          </Link>

          <Link to='/deletebook'>
            <button className={style.btn}>Borrar Libro</button>
          </Link>
        </div>

        <Link to='/admin'>
          <button className={`${style.btn} ${style.btnAdmin}`}>↼ Back</button>
        </Link>
      </div>
    </div>
  )
}
