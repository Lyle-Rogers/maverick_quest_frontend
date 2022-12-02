import { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/Login.scss';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserContext } from '../App';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  function login() {
    eraseErrors();

    if (!username || !password) {
      setUsernameError('A field is blank');
      setPasswordError('A field is blank');
      return;
    }

    axios
      .post('http://127.0.0.1:8000/api/login', {
        username: username,
        password: password,
      })
      .then(res => {
        if (res.data.user_id) {
          localStorage.setItem('user_id', res.data.user_id);
          localStorage.setItem('auth_token', res.data.auth_token);

          setUser({
            id: res.data.user_id,
            auth_token: res.data.auth_token,
            logged_in: true,
          });

          navigate('/');
        } else if (res.data === 'Invalid username') {
          setUsernameError('The username is invalid');
        } else if (res.data === 'Invalid password') {
          setPasswordError('The password is invalid');
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  function eraseErrors() {
    setUsernameError(null);
    setPasswordError(null);
  }

  return (
    <div className='loginContainer'>
      <div className='title'>Maverick Quest</div>
      <div className='usernameContainer'>
        <div
          className='usernameTitle'
          style={{ display: username ? null : 'none' }}>
          username
        </div>
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
        <div
          className='passwordTitle'
          style={{ display: password ? null : 'none' }}>
          password
        </div>
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
        <div className='loginBtn' onClick={login}>
          Login
        </div>
      </div>
    </div>
  );
}
