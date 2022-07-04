import React from 'react'
import styles from '../Styles/UserDatosPerfil.module.css'
const UserDatosPerfil = ({
  name,
  surname,
  email,
  dni,
  nickname,
  birthday,
  country,
  phone,
  address,
}) => {
  return (
    <div className={styles.containerUserProfile}>
      <h2>Mi perfil</h2>
      <div className={styles.containerUser}>
        <p>Nombre: {name}</p>
        <p>Apellido: {surname}</p>
        <p>Email: {email}</p>
        <p>Usuario: {nickname}</p>
        <p>DNI: {dni}</p>
        <p>País: {country}</p>
        <p>Tel: {phone}</p>
        <p>Dirección: {address}</p>
        <p>Fecha de nacimiento: {birthday}</p>
      </div>
    </div>
  )
}

export default UserDatosPerfil
