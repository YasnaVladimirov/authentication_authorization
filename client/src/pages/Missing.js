import React from 'react'
import { Link } from 'react-router-dom'

function Missing() {
  return (
    <div className='container'>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className='flexGrow'>
        <Link to="/" className='link'>Visit Our Homepage</Link>
      </div>
    </div>
  )
}

export default Missing