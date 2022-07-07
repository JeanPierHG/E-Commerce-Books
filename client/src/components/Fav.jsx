import React from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { addFav, getUsers } from '../actions'

const Fav = ({ book }) => {

  const isLogged = useSelector((state) => state.userLogged);

  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0()

  const handleClick = () => {
    const id = isLogged[0]._id
    if (isLogged.length === 0) return loginWithRedirect()
    if (isLogged[0].favouritesBooks.includes(book)) return alert('Ya es un libro favorito');
    dispatch(addFav(book, id))
    alert('Libro agregado a favoritos')
    dispatch(getUsers())
  }

  return (
    <div>
      <BsHeartFill onClick={() => handleClick()} />
    </div>
  )
}

export default Fav
