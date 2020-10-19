import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions'

function Logout() {

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default Logout
