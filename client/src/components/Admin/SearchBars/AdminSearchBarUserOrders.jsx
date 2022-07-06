import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getUserNameOrders } from '../../../actions'

export default function AdminSearchBarUserOrders(){
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getUserNameOrders(input))
    scroller.scrollTo('gaston')
    setInput('')
  }

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Email Usuario'
        value={input}
        onChange={(e) => handleChange(e)}
        className={styles.input}
      />
      <button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        className={styles.button}
      >
        Buscar
      </button>
    </div>
  )
}



