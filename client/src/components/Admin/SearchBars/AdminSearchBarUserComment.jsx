import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from '../../../Styles/searchBar.module.css'
import { scroller } from 'react-scroll'
import { getUserNameComment } from '../../../actions'

const AdminSearchBarUserComment = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getUserNameComment(input))
    setInput('')
  }

  const handleKeyPress = (e) => {
    if(e.charCode === 13){
        e.preventDefault();
        dispatch(getUserNameComment(input));
        setInput('');
    }
}

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Usuario'
        value={input}
        onChange={(e) => handleChange(e)}
        className={styles.input}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        className={styles.button}
       
      >
        Buscar por Usuario
      </button>
    </div>
  )
}

export default AdminSearchBarUserComment


