import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.scss';

import Navigator from './components/Navigator';

const App = () => {
  const [user, setUser] = useState({
    id: JSON.stringify(localStorage.getItem('user_id')),
    auth_token: JSON.stringify(localStorage.getItem('auth_token')),
    first_page: 'loading',
  });

  function automaticAuth() {
    if (!user.id || !user.auth_token) {
      setUser({ ...user, first_page: 'login' });
      return;
    }

    axios
      .post('http://127.0.0.1:8000/api/automatic_login', {
        auth_token: user.auth_token,
      })
      .then(res => {
        if (res.data == 'Token is invalid') {
          setUser({ ...user, first_page: 'login' });
        } else {
          setUser({ ...user, first_page: 'home' });
        }
      });
  }

  useEffect(() => {
    automaticAuth();
  }, []);

  return (
    <div className='App'>
      {user.first_page == 'loading' ? (
        <div>Loading</div>
      ) : user.first_page == 'login' ? (
        <div>Login</div>
      ) : user.first_page == 'home' ? (
        <Navigator />
      ) : null}
    </div>
  );
};

export default App;
