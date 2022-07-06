import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllOrders } from '../../../actions'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/Button.module.css'
export default function AdminRefreshOrders() {
  const dispatch = useDispatch()

  const handleClickOrders = (e) => {
    e.preventDefault()
    dispatch(getAllOrders())
    navigate('/admin/')
    scroller.scrollTo('gaston')
  }

  return (
    <div>
      <Link to='/admin'>
        <button className={styles.button} onClick={handleClickOrders}>
          Todas las ordenes
        </button>
      </Link>
    </div>
  )
}
