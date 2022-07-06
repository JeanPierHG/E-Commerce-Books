import React from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../../actions'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/Button.module.css'
export default function AdminRefreshUsers() {
  const dispatch = useDispatch()

  const handleClickUsers = (e) => {
    e.preventDefault()
    dispatch(getUsers())
    scroller.scrollTo('gaston')
  }

  return (
    <div>
      <button className={styles.button} onClick={handleClickUsers}>
        Todos los Usuarios
      </button>
    </div>
  )
}
