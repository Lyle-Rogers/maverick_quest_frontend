import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Register.scss';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoaderCircle from '../assets/lotties/LoaderCircle.json';

import { UserContext } from '../App';

export default function Register() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verifyPasswordError, setVerifyPasswordError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [verifyPasswordShown, setVerifyPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loaderCircleOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderCircle,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  function register() {
    eraseErrors();

    if (!username) {
      setUsernameError('The username is blank');
      return;
    }

    if (!password) {
      setPasswordError('The password is blank');
      return;
    }

    if (!verifyPassword) {
      setVerifyPasswordError('Password verification is blank');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be 6 characters or more');
      return;
    }

    if (password != verifyPassword) {
      setVerifyPasswordError('Password verification failed');
      return;
    }

    setLoading(true);

    axios
      .post('http://127.0.0.1:8000/api/register', {
        username: username,
        password: password,
      })
      .then(res => {
        if (res.data.user_id) {
          localStorage.setItem('user_id', JSON.stringify(res.data.user_id));
          localStorage.setItem(
            'auth_token',
            JSON.stringify(res.data.auth_token),
          );

          setUser({
            id: res.data.user_id,
            auth_token: res.data.auth_token,
            logged_in: true,
          });

          navigate('/');
        } else if (res.data === 'That username is already registered') {
          setUsernameError('That username is already registered');
          setLoading(false);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  function eraseErrors() {
    setUsernameError(null);
    setPasswordError(null);
    setVerifyPasswordError(null);
  }

  useEffect(() => {
    if (user.logged_in) {
      navigate('/');
    }
  }, []);

  return (
    <div className='loginContainer'>
      <div className='title'>Maverick Quest</div>
      <div className='usernameContainer'>
        <div className='usernameTitle' style={{ display: !username && 'none' }}>
          username
        </div>
        <input
          type='text'
          className='username'
          onClick={eraseErrors}
          value={username}
          placeholder='Username'
          maxLength={71}
          onChange={e => setUsername(e.target.value)}
        />
        {usernameError && <div className='usernameError'>{usernameError}</div>}
      </div>
      <div className='passwordContainer'>
        <div className='passwordTitle' style={{ display: !password && 'none' }}>
          password
        </div>
        <div className='passwordInput'>
          <input
            type={passwordShown ? 'text' : 'password'}
            className='password'
            onClick={eraseErrors}
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
        {passwordError && <div className='passwordError'>{passwordError}</div>}
      </div>
      <div className='passwordContainer'>
        <div
          className='passwordTitle'
          style={{ display: !verifyPassword && 'none' }}>
          password verification
        </div>
        <div className='passwordInput'>
          <input
            type={verifyPasswordShown ? 'text' : 'password'}
            className='password'
            onClick={eraseErrors}
            value={verifyPassword}
            placeholder='Password verification'
            maxLength={61}
            onChange={e => setVerifyPassword(e.target.value)}
          />
          <div
            className='passwordEye'
            onClick={() => setVerifyPasswordShown(!verifyPasswordShown)}>
            {verifyPasswordShown ? (
              <FontAwesomeIcon icon='eye' />
            ) : (
              <FontAwesomeIcon icon='eye-slash' />
            )}
          </div>
        </div>
        {verifyPasswordError && (
          <div className='passwordError'>{verifyPasswordError}</div>
        )}
      </div>
      <div className='authenticationBtns'>
        <Link to={'/login'} className='signUpBtn'>
          Sign in
        </Link>
        {loading && (
          <div className='loaderCircle'>
            <Lottie
              options={loaderCircleOptions}
              height={61}
              width={61}
              isClickToPauseDisabled={true}
            />
          </div>
        )}
        <div className='loginBtn' onClick={register}>
          Register
        </div>
      </div>
    </div>
  );
}
