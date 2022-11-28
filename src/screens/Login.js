// localStorage.setItem('user_id', false);
// localStorage.setItem('auth_token', false);
// localStorage.clear();

import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/Login.scss';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [usernameError, setUsernameError] = useState(
    'An error that happened I think!',
  );
  const [passwordError, setPasswordError] = useState(
    'An error that happened ed I think!',
  );
  const [passwordShown, setPasswordShown] = useState(false);

  function login() {
    eraseErrors();
  }

  function eraseErrors() {
    setUsernameError(null);
    setPasswordError(null);
  }

  return (
    <div className='loginContainer'>
      <div className='title'>Maverick Quest</div>
      <div className='usernameContainer'>
        <div className='usernameTitle'>username</div>
        <input
          type='text'
          className='username'
          value={username}
          placeholder='Username'
          maxLength={71}
          onChange={e => setUsername(e.target.value)}
        />
        {usernameError ? (
          <div className='usernameError'>{usernameError}</div>
        ) : null}
      </div>
      <div className='passwordContainer'>
        <div className='passwordTitle'>password</div>
        <div className='passwordInput'>
          <input
            type={passwordShown ? 'text' : 'password'}
            className='password'
            value={password}
            placeholder='Password'
            maxLength={61}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className='passwordEye'
            onClick={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? (
              <FontAwesomeIcon icon='eye' />
            ) : (
              <FontAwesomeIcon icon='eye-slash' />
            )}
          </div>
        </div>
        {passwordError ? (
          <div className='passwordError'>{passwordError}</div>
        ) : null}
      </div>
      <div className='authenticationBtns'>
        <Link to={'/register'} className='signUpBtn'>
          Sign up
        </Link>
        <div className='loginBtn' onClick={eraseErrors}>
          Login
        </div>
      </div>
    </div>
  );
}
