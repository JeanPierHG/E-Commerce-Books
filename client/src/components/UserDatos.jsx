import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, postUserData, setUserNews, setUserPlan } from '../actions'
import UserDatosPerfil from './UserDatosPerfil'
import styles from '../Styles/UserDatos.module.css'

const UserDatos = () => {
  const allUsers = useSelector((state) => state.users)
  const logged = useSelector((state) => state.userLogged)
  const userId = allUsers.filter((u) => u._id === logged[0]._id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [state, setState] = useState('')
  const [input, setInput] = useState({
    name: '',
    surname: '',
    birthday: '',
    country: '',
    dni: '',
    phone: '',
    address: '',
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = logged[0]._id;
    dispatch(postUserData(id, input));
    alert('Datos personales actualizado');
    setTimeout(function(){
      dispatch(getUsers()), 100
    })
  }

  const handleClick = () => {
    setState(!state);
  }

  const handlePlanDelete = () => {
    const id = [logged[0]._id];
    dispatch(setUserPlan(id));
    alert('Desuscripción a "Soy Premium" con éxito');
    setTimeout(function(){
      dispatch(getUsers()), 100
    })
  }

  const handleNewsDelete = () => {
    const id = [logged[0]._id];
    dispatch(setUserNews(id));
    alert('Desuscripción a nuestro Newsletter con éxito');
    setTimeout(function(){
      dispatch(getUsers()), 100
    })
  }

  return (
    <div className={styles.containerAll}>
      <form className={styles.userForm} onSubmit={(e) => handleSubmit(e)}>
        <legend className={styles.legendForm}>Datos personales</legend>

        <div className={styles.containerInputsGrid}>
          <div className={styles.containerInput}>
            <label htmlFor='nickname'>Usuario:</label>
            <input
              type='text'
              name='nickname'
              value={userId[0].nickname}
              readOnly
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='email'>Email:</label>
            <input type='text' name='email' value={userId[0].email} readOnly />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              name='name'
              onChange={(e) => handleChange(e)}
              value={input.name}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='surname'>Apellido:</label>
            <input
              type='text'
              name='surname'
              onChange={(e) => handleChange(e)}
              value={input.surname}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='birthday'>Fecha de Nacimiento:</label>
            <input
              type='date'
              name='birthday'
              onChange={(e) => handleChange(e)}
              value={input.birthday}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='country'>Nacionalidad:</label>
            <input
              type='text'
              name='country'
              onChange={(e) => handleChange(e)}
              value={input.country}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='dni'>Nº de Documento:</label>
            <input
              type='text'
              name='dni'
              onChange={(e) => handleChange(e)}
              value={input.dni}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='phone'>Telofono:</label>
            <input
              type='text'
              name='phone'
              onChange={(e) => handleChange(e)}
              value={input.phone}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='address'>Direccion:</label>
            <input
              type='text'
              name='address'
              onChange={(e) => handleChange(e)}
              value={input.address}
            />
          </div>
        </div>
        <button className={styles.button} type='submit'>
          Actualizar
        </button>
      </form>

      <div className={styles.containerUserPlan}>
        <h3>Plan</h3>
        <div className={styles.userPlan}>
          <p>Usuario: {userId[0].nickname} </p>
          <p>NewsLetter: {userId[0].isSubscribeNewsLetter ? 'Si' : 'No'} </p>
          <p>Premium: {userId[0].isPremiun ? 'Si' : 'No'} </p>
        </div>
        <div className={styles.buttonUserContainer}>
          {userId[0].isSubscribeNewsLetter === false ? (
            <button className={styles.button} disabled>
              Baja al NewsLetter
            </button>
          ) : (
            <button className={styles.button} onClick={handleNewsDelete}>
              Baja al NewsLetter
            </button>
          )}

          {userId[0].isPremiun === false ? (
            <button className={styles.button} disabled>
              Baja a Soy Premium
            </button>
          ) : (
            <button className={styles.button} onClick={handlePlanDelete}>
              Baja a Soy Premium
            </button>
          )}
        </div>
        <div>
          <p>
            Si quieres modificar tu forma de pago favor escríbenos a:
            growup@gmail.com
          </p>
        </div>
      </div>

      <br />
      <button onClick={handleClick} className={styles.button}>
        Ver mis datos
      </button>

      {state ? (
        <UserDatosPerfil
          name={userId[0].name}
          surname={userId[0].surname}
          email={userId[0].email}
          dni={userId[0].dni}
          nickname={userId[0].nickname}
          birthday={userId[0].birthday}
          country={userId[0].country}
          phone={userId[0].phone}
          address={userId[0].address}
        />
      ) : (
        <p>
          El camino al exito está en la lectura de libros inspiradores. 'Luis
          Chacon'
        </p>
      )}
    </div>
  )
}

export default UserDatos
