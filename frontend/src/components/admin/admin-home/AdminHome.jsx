import React from 'react'
import "./AdminHome.scss"
import UserDetails from './user-details/UserDetails'
import UserList from './user-list/UserList'
function AdminHome() {
  return (
    <div className='homeContainer'>
      <UserList/>
      <UserDetails/>
    </div>
  )
}

export default AdminHome