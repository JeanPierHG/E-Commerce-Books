import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBookGenre, getBooks } from '../actions'
import { scroller } from 'react-scroll'
import LogInButton from './LogIn'
import LogOutButton from './LogOut'
import { useAuth0 } from '@auth0/auth0-react'
import styles from '../Styles/nav.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const [state, setState] = useState('default')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth0()
  const usuario = useSelector ( state => state.userLogged )

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getBooks())
    navigate('/home/')
    scroller.scrollTo('gaston')
  }

  const handleSelectGenre = (e) => {
    e.preventDefault()
    dispatch(getBookGenre(e.target.value))
    navigate('/home/')
    scroller.scrollTo('gaston')
    setState('default')
  }

  /* Styles Select */

  const genres = [
    'Salud',
    'Deportes',
    'Biografia',
    'Nutricion',
    'Filosofia',
    'Ensayo',
    'Desarrollo Personal',
    'Economia',
    'Espiritualidad',
    'Historia',
    'Negocios',
    'Psicologia',
    'Neurociencia',
  ]

  return (
    <div className={styles.container}>
      <h3 className={styles.logo}>Grow Up-Libros</h3>

      <Link to='/home' className={styles.Link}>
        <p className={styles.navItem} onClick={handleClick}>
          Todos los libros
        </p>
      </Link>

      <Link to='/home' className={styles.Link}>
        <p className={styles.navItem}>Inicio</p>
      </Link>

      <div>
        <Link to='/author' className={styles.Link}>
          <p className={styles.navItem}>Autores</p>
        </Link>
      </div>

      <div>
        <select
          defaultValue='default'
          value={state}
          onChange={(e) => handleSelectGenre(e)}
          className={styles.select}
        >
          <option value='default' disabled>
            Generos:
          </option>
          {genres?.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <SearchBar />

      <div className={styles.toggle}>
        <div className={styles.bar}></div>
      </div>

      { 
      
      usuario.length === 1 && usuario[0].isBanned===false
      ?
      (
        <Link to='/user' className={styles.Link}>
          <h3 className={styles.navItem}>Mi cuenta</h3>
        </Link>
      ) : 
        ''
      }

      {/* <Link to='/user'><h3 className={style.navItem}>Login</h3></Link> */}

      {isAuthenticated ? <LogOutButton /> : <LogInButton />}
    </div>
  )
}

export default NavBar
