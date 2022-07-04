import { useDispatch } from 'react-redux'
import { setUserBanned, getUsers } from '../../actions'
import styles from '../../Styles/Button.module.css'
export default function AdminUserBanned({ users, setChanged, changed }) {
  const dispatch = useDispatch()

  var userIds = []

  function toogleAdmin(e, users) {
    users.map((usuario) => {
      userIds.push(usuario._id)
    })

    dispatch(setUserBanned(userIds))

    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
    setChanged(!changed)
    userIds = []
  }

  return (
    <div>
      <button className={styles.button} onClick={(e) => toogleAdmin(e, users)}>
        Bloquear/Desbloquear Usuario
      </button>
    </div>
  )
}
