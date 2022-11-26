// localStorage.setItem('user_id', false);
// localStorage.setItem('auth_token', false);
// localStorage.clear();

import React, { useContext } from 'react';
import '../styles/Login.scss';
import { UserContext } from '../App';

export default function Login() {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className='loginContainer'>
      <div>Login</div>
    </div>
  );
}
