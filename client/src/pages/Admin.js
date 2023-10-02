import React from 'react'
import { Link } from 'react-router-dom'
import Users from '../components/Users'

function Admin() {

  return (
    <div className='container'>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <br />
      <p>You must have been assigned an Admin role.</p>
      <div className='goTo'>
        <Link to="/" className='link'>Home</Link>
      </div>
    </div>
  )
}

export default Admin