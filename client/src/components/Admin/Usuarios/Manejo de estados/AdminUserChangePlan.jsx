import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserPlan, getUsers } from '../../../../actions'
import styles from '../../../../Styles/Button.module.css'
export default function AdminUserChangePlan({ users, setChanged, changed }) {
  const dispatch = useDispatch()

  var userIds = []

  function toogleAdmin(e, users) {
    users.map((usuario) => {
      userIds.push(usuario._id)
    })
    dispatch(setUserPlan(userIds))

    setTimeout(function () {
      dispatch(getUsers())
    }, 500)

    setChanged(!changed)

    userIds = []
  }

  return (
    <div>
      <button className={styles.button} onClick={(e) => toogleAdmin(e, users)}>
        Cambiar Plan
      </button>
    </div>
  )
}
