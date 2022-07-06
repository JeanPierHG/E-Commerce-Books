import React from 'react'
import { useDispatch } from 'react-redux'
import { getAuthorsAdmin } from '../../../actions'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/Button.module.css'
export default function AdminRefreshAuthor() {
  const dispatch = useDispatch()

  const handleClickAuthors = (e) => {
    e.preventDefault()
    dispatch(getAuthorsAdmin())
    navigate('/admin/')
    scroller.scrollTo('gaston')
  }

  return (
    <div>
      <Link to='/admin'>
        <button className={styles.button} onClick={handleClickAuthors}>
          Todos los Autores
        </button>
      </Link>
    </div>
  )
}
