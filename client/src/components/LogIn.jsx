import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

export default function LogInButton() {
  const { loginWithRedirect } = useAuth0()
  //const dispatch = useDispatch()

  // async function handleClick(e){
  //     await  loginWithRedirect()
  //     dispatch (postUser(user))
  // }

  return (
    <div>
      <Button variant='contained' onClick={() => loginWithRedirect()}>
        LogIn
      </Button>
    </div>
  )
}
