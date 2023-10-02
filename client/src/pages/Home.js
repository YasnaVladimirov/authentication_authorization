import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

function Home() {
  const { setAuth, auth, setPersist } = useAuth();
  const navigate = useNavigate();
  
  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true
      });
      setAuth({});
      setPersist(false);
      localStorage.setItem("persist", false);
      navigate("/linkpage"); 
    } catch (error) {
      console.log("Error logging out! ", error);
    }
  }

  return (
    <div className='container'>
      <h1>Home</h1>
      <h3>You are logged in!</h3>
      <div className='links'>
        <Link to="/editor" className='link'>Go to the Editor page</Link>
        <Link to="/admin" className='link'>Go to the Admin page</Link>
        <Link to="/lounge" className='link'>Go to the Lounge</Link>
        <Link to="/linkpage" className='link'>Go to the Link page</Link>
      </div>
      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Home