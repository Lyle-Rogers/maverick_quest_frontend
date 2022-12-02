import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

export const UserContext = createContext(null);

import { RequireAuth } from './components/RequireAuth';

const App = () => {
  const [user, setUser] = useState({
    id: localStorage.getItem('user_id'),
    auth_token: localStorage.getItem('auth_token'),
    logged_in: false,
  });
  const navigate = useNavigate();

  function automaticAuth() {
    if (!user.id || !user.auth_token) {
      navigate('login');
    }

    axios
      .post('http://127.0.0.1:8000/api/automatic_login', {
        auth_token: user.auth_token,
      })
      .then(res => {
        if (res.data === 'Token is invalid') {
          navigate('login');
        } else {
          setUser({ ...user, logged_in: true });
          navigate('/');
        }
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    automaticAuth();
    library.add(faEyeSlash, faEye);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
