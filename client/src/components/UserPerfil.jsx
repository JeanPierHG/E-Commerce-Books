import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0, User } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { postUser } from '../actions'
import { useSelector } from 'react-redux'
import styles from '../Styles/UserPerfil.module.css'
import UserDatos from './UserDatos'
import UserPlanLectura from './UserPlanLectura'
import UserSuscripcion from './UserSuscripcion'
import UserFav from './UserFav'
const UserPerfil = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useAuth0()
  const usuarios = useSelector((state) => state.users)
  const usuario = usuarios.filter((u) => u.email === user.email)
  const [component, setComponent] = useState('')
  if (isLoading) {
    return <div>Cargando...</div>
  }

  const handleInput = (e) => {
    e.preventDefault()
    const name = e.target.name
    if (name === 'userData') setComponent(<UserDatos />)
    if (name === 'userSubscripcion') setComponent(<UserSuscripcion />)
    if (name === 'userPlanLectura') setComponent(<UserPlanLectura />)
    if (name === 'userFav') setComponent(<UserFav />)
  }

  return (
    <div className={styles.containerUserPerfil}>
      {isAuthenticated && (
        <div className={styles.containerTitle}>
          <h1 className={styles.titlePerfil}>Bienvenido:</h1>
          <h2 className={styles.nicknamePerfil}>{user.nickname}</h2>
        </div>
      )}
      <div className={styles.containerUserGrid}>
        <div className={styles.containerButtons}>
          <button
            className={styles.button}
            name='userData'
            onClick={handleInput}
          >
            Mis datos personales
          </button>

          <button
            className={styles.button}
            onClick={handleInput}
            name='userSubscripcion'
          >
            Mi plan de suscripcion
          </button>

          <button
            className={styles.button}
            onClick={handleInput}
            name='userFav'
          >
            Mis libros deseados
          </button>

          <button
            className={styles.button}
            onClick={handleInput}
            name='userPlanLectura'
          >
            Mi plan de lectura
          </button>

          <button className={styles.button} name=''>
            Mis compras
          </button>
        </div>
        <div className={styles.containerSection}>{component}</div>
      </div>
    </div>
  )
}

export default UserPerfil

// export default function Profile(){

//     const{ user , isAuthenticated , isLoading} = useAuth0()

//     if(isLoading){
//         return <div>Cargando...</div>
//     }

//     return (
//         isAuthenticated && (
//             <div>
//                  {JSON.stringify(user)}

//                 {/* <img src={user.picture} alt={user.name}/>
//                 <h2>{user.name}</h2>
//                 <p>Email: {user.email}</p> */}
//             </div>
//         )
//     )
// }

// {"nickname":"guillermobr88",
// "name":"guillermobr88@gmail.com",
// "picture":"https://s.gravatar.com/avatar/13aa6d5b3b0c99cc535fed7a2abf7d87?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgu.png",
// "updated_at":"2022-06-27T18:15:56.384Z",
// "email":"guillermobr88@gmail.com",
// "email_verified":true,
// "sub":"auth0|62b829304dd722e042fa9e14"}
