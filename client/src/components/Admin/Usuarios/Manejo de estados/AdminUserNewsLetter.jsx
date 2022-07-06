import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserNews, getUsers } from '../../../../actions'
import styles from '../../../../Styles/Button.module.css'

export default function AdminUserNewsLetter({ users, setChanged, changed }) {
  const dispatch = useDispatch()

  var userIds = []

  function toogleAdmin(e, users) {
    users.map((usuario) => {
      userIds.push(usuario._id)
    })
    dispatch(setUserNews(userIds))

    setTimeout(function () {
      dispatch(getUsers())
    }, 500)

    setChanged(!changed)

    userIds = []
  }

  return (
    <div>
      <button className={styles.button} onClick={(e) => toogleAdmin(e, users)}>
        Suscribir/Desuscribir NewsLetter
      </button>
    </div>
  )
}
