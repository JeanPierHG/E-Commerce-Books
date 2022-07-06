import { useDispatch } from 'react-redux'
import { setToSuperAdmin, getUsers } from '../../../actions'
import styles from '../../../Styles/Button.module.css'
export default function SuperAdminProSet(props) {
  const dispatch = useDispatch()

  const users = props.users
  const setChanged = props.setChanged
  const changed = props.changed
  //console.log("changed es: ", changed);
  var userIds = []

  function toogleAdmin(e, users) {
    users.forEach((usuario) => {
      userIds.push(usuario._id)
    })
    dispatch(setToSuperAdmin(userIds))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
    setChanged(!changed)
    // console.log("changed AHORA ES es: ", changed);
    userIds = []
  }

  return (
    <button className={styles.button} onClick={(e) => toogleAdmin(e, users)}>
      Permiso de Administrador PRO
    </button>
  )
}
