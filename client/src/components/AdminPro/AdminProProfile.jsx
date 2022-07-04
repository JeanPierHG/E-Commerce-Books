import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUsers, postUserData } from '../../actions'
import styles from '../../Styles/AdminProProfile.module.css'

export function AdminProProfile() {
  const allUsers = useSelector((state) => state.users)
  const adminProLogged = useSelector ( state => state.userLogged)
  //const adminProLogged = allUsers.filter((usuario) => usuario.isSuperAdmin === true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //console.log(adminProLogged)

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
    e.preventDefault()
    const id = adminProLogged[0]._id
    dispatch(postUserData(id, input))
    alert('Datos personales actualizado')
    navigate('/adminpro')
    dispatch(getUsers())
  }

  const handleClick = () => {
    setState('ok')
  }

  useEffect(() => {
    return () => {
      dispatch(getUsers())
    }
  }, [dispatch])

  return (
    <div className={styles.containerAll}>
      <NavLink className={` ${styles.buttonBack}`} to='/adminpro'>
        <button className={`${styles.button} `}>Volver</button>
      </NavLink>

      <form className={styles.userForm} onSubmit={(e) => handleSubmit(e)}>
        <legend className={styles.legendForm}>Datos personales</legend>

        <div className={styles.containerInputsGrid}>
          <div className={styles.containerInput}>
            <label htmlFor='nickname'>Usuario:</label>
            <input
              type='text'
              name='nickname'
              value={adminProLogged[0].nickname}
              readOnly
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              value={adminProLogged[0].email}
              readOnly
            />
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

      <div className={styles.containerUserProfile}>
        <h2>Mi perfil</h2>
        <div className={styles.containerUser}>
          <p>Nombre: {adminProLogged[0].name}</p>
          <p>Apellido: {adminProLogged[0].surname}</p>
          <p>Email: {adminProLogged[0].email}</p>
          <p>Usuario: {adminProLogged[0].nickname}</p>
          <p>DNI: {adminProLogged[0].dni}</p>
          <p>País: {adminProLogged[0].country}</p>
          <p>Tel: {adminProLogged[0].phone}</p>
          <p>Dirección: {adminProLogged[0].address}</p>
          <p>Fecha de nacimiento: {adminProLogged[0].birthday}</p>
        </div>
      </div>
    </div>
  )
}
