import React from 'react'
import { Link } from 'react-router-dom'

function LinkPage() {
  return (
    <div className='container'>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <div className='links'>
        <Link to="/login" className='link'>Login</Link>
        <Link to="/register" className='link'>Register</Link>
      </div>
      <h2>Private</h2>
      <div className='links'>
        <Link to="/" className='link'>Home</Link>
        <Link to="/editor" className='link'>Editors Page</Link>
        <Link to="/admin" className='link'>Admin Page</Link>
      </div>
    </div>
  )
}

export default LinkPage