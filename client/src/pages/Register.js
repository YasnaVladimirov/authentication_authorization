import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;

function Register() {
  const usernameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pswFocus, setPswFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchPswFocus, setMatchPswFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
    setValidMatch(PWD_REGEX.test(password) && password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPassword])



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username, password, matchPassword
      });
      setUsername("");
      setPassword("");
      setMatchPassword("");
      navigate("/login");
    } catch (error) {
      setErrMsg("Registration failed!");
      console.error("Error registering user, " + error.response.data.errors);
    }
  }


  return (
    <div className='container'>
      <p ref={errRef} className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
      <h1>Register</h1>
      <form>
        <label htmlFor='username'>
          Username:
          <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
        </label>
        <input
          id='username'
          ref={usernameRef}
          type='text'
          name='username'
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p className={userFocus && username && !validUsername ? "instructions" : "hide"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor='password'>
          Password:
          <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
        </label>
        <input
          id='password'
          type='password'
          name='password'

          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPswFocus(true)}
          onBlur={() => setPswFocus(false)}
        />
        <p className={pswFocus && password && !validPassword ? "instructions" : "hide"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          5 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: !@#$%
        </p>

        <label htmlFor='matchPassword'>
          Confirm Password:
          <FontAwesomeIcon icon={faCheck} className={validMatch ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
        </label>
        <input
          id='matchPassword'
          type='password'
          name='matchPassword'

          onChange={(e) => setMatchPassword(e.target.value)}
          onFocus={() => setMatchPswFocus(true)}
          onBlur={() => setMatchPswFocus(false)}
        />
        <p className={matchPswFocus && matchPassword && !validMatch ? "instructions" : "hide"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button disabled={!validUsername || !validPassword || !validMatch ? true : false} onClick={handleSubmit}>Sign Up</button>
      </form>
      <div className='goTo'>
        <p>Already registered?</p>
        <Link to="/login" className='link'>Sing in</Link>
      </div>
    </div>
  )
}

export default Register