import React from 'react'
import { Link } from 'react-router-dom'

function Editor() {
  return (
    <div className='container'>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className='goTo'>
        <Link to="/" className='link'>Home</Link>
      </div>
    </div>
  )
}

export default Editor