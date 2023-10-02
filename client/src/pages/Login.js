import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import useAuth from '../hooks/useAuth';


function Login() {
  const usernameRef = useRef();
  const errRef = useRef();
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const to = location?.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //withou withCredentials, logout doesn't work, why?
      const response = await axios.post("http://localhost:5000/login", {
        username, password
      }, {
        withCredentials: true
      });
      const roles = response.data.roles;
      const accessToken = response.data.accessToken;
      setAuth({ username, password, roles, accessToken })
      setUsername("");
      setPassword("");
      navigate(to, { replace: true });
    } catch (error) {
      setErrMsg("Invalid or missing username/password!");
      console.error("Error logging user, " + error);
      errRef.current.focus();
    }
  }

  const toggle = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist]);

  return (
    <div className='container'>
      <p ref={errRef} className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
      <h1>Login</h1>
      <form>
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          ref={usernameRef}
          type='text'
          autoComplete="off"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>Sign In</button>

        <div className='checkbox'>
          <input
            type='checkbox'
            id='persist'
            value={persist}
            onChange={() => toggle()}
          />
          <label htmlFor='persist'>Trust this device?</label>
        </div>
      </form>
      <div className='goTo'>
        <p>Don't have an account?</p>
        <Link to="/register" className='link'>Sing Up</Link>
      </div>
    </div>
  )
}

export default Login