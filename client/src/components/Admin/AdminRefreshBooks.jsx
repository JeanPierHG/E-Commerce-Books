import React from 'react'
import { useDispatch } from 'react-redux'
import { getBooksAdmin } from '../../actions'
import { Link } from 'react-router-dom'
import styles from '../../Styles/Button.module.css'
export default function AdminRefreshBooks() {
  const dispatch = useDispatch()

  const handleClickBooks = (e) => {
    e.preventDefault()
    dispatch(getBooksAdmin())
    navigate('/admin/')
    scroller.scrollTo('gaston')
  }

  return (
    <div>
      <Link to='/admin'>
        <button className={styles.button} onClick={handleClickBooks}>
          Todos los libros
        </button>
      </Link>
    </div>
  )
}
