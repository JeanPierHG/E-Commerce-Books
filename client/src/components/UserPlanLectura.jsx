import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserPlanLecturaBooks from './UserPlanLecturaBooks'
import styles from '../Styles/UserPlanLectura.module.css'

const UserPlanLectura = () => {
  const [state, setState] = useState({
    show: '',
    size: '',
    genre: '',
    budget: '',
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = () => {
    setState({
      ...state,
      show: 'ok',
    })
  }

  return (
    <div className={styles.containerInputs}>
      <h3>Te vamos a ayudar a elegir tus proximos libros a leer:</h3>
      <h5>Responde las siguientes preguntas y espera tus resultados:</h5>

      <p>¿Te gustaria leer un libro de mas de 300 paginas o libros cortos?</p>
      <input
        type='list'
        list='size'
        name='size'
        onChange={(e) => handleChange(e)}
      />
      <datalist id='size' name='size'>
        <option value='cortos'></option>
        <option value='largos'></option>
      </datalist>

      <p>¿Te gustan más las novelas?</p>
      <div className={styles.containerRadioButtons}>
        <div>
          <label htmlFor='novels'>Novela</label>
          <input
            type='radio'
            name='novels'
            value='Novela'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label htmlFor='novels'>Manuales</label>
          <input
            type='radio'
            name='novels'
            value='Manuales'
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <p>¿Qué géneros preferis?</p>
      <input
        type='list'
        list='genre'
        name='genre'
        onChange={(e) => handleChange(e)}
      />
      <datalist id='genre' name='genre'>
        <option value='Desarrollo Personal'></option>
        <option value='Negocios y Biografía'></option>
      </datalist>

      <p>¿Con que presupuesto contas?</p>
      <input
        type='list'
        list='budget'
        name='budget'
        onChange={(e) => handleChange(e)}
      />
      <datalist id='budget' name='budget'>
        <option value='Menos de $3.500'></option>
        <option value='Más de $3.500'></option>
      </datalist>
      <br />
      <button className={styles.button} type='submit' onClick={handleClick}>
        Resultados
      </button>

      {state.show === 'ok' ? (
        <UserPlanLecturaBooks
          size={state.size}
          genre={state.genre}
          budget={state.budget}
        />
      ) : (
        <p>..."No dejes para mañana lo que puedas leer hoy"...</p>
      )}
    </div>
  )
}

export default UserPlanLectura
