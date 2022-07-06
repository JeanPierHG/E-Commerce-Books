import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../../Styles/Put.module.css'
export default function Put() {
  return (
    <div className={style.put}>
      <div className={style.containerPut}>
        <div className={style.actionsButtons}>
          <Link to='/putauthor'>
            <button className={style.btn}>Modificar Autor</button>
          </Link>

          <Link to='/putbook'>
            <button className={style.btn}>Modificar Libro</button>
          </Link>
        </div>

        <Link to='/admin'>
          <button className={`${style.btn} ${style.btnAdmin}`}>↼ Back</button>
        </Link>
      </div>
    </div>
  )
}
