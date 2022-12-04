import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Login.scss';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoaderCircle from '../assets/lotties/LoaderCircle.json';

import { UserContext } from '../App';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
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

  function login() {
    eraseErrors();

    if (!username || !password) {
      if (!username) {
        setUsernameError('The username is blank');
      }

      if (!password) {
        setPasswordError('The password is blank');
      }

      return;
    }

    setLoading(true);

    axios
      .post('http://127.0.0.1:8000/api/login', {
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
        } else if (res.data === 'Invalid username') {
          setUsernameError('The username is invalid');
          setLoading(false);
        } else if (res.data === 'Invalid password') {
          setPasswordError('The password is invalid');
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
      <div className='authenticationBtns'>
        <Link to={'/register'} className='signUpBtn'>
          Sign up
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
        <div className='loginBtn' onClick={login}>
          Login
        </div>
      </div>
    </div>
  );
}
