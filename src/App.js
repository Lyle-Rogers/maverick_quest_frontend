import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import './styles/App.scss';

import Loading from './screens/Loading';
import AuthNavigator from './components/AuthNavigator';
import Navigator from './components/Navigator';

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState({
    id: localStorage.getItem('user_id'),
    auth_token: localStorage.getItem('auth_token'),
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
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    automaticAuth();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className='App'>
        {user.first_page == 'loading' ? (
          <Loading />
        ) : user.first_page == 'login' ? (
          <AuthNavigator />
        ) : user.first_page == 'home' ? (
          <Navigator />
        ) : null}
      </div>
    </UserContext.Provider>
  );
};

export default App;
