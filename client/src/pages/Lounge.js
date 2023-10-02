import React from 'react'
import { Link } from 'react-router-dom'

function Lounge() {
  return (
    <div className='container'>
      <h1>The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div className='goTo'>
        <Link to="/" className='link'>Home</Link>
      </div>
    </div>
  )
}

export default Lounge