import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEyeSlash,
  faEye,
  faBars,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import JobScope from './screens/JobScope';
import Settings from './screens/Settings';

import { RequireAuth } from './components/RequireAuth';

library.add(faEyeSlash, faEye, faBars, faGear);

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState({
    id: null,
    auth_token: null,
    logged_in: false,
  });
  const navigate = useNavigate();

  function automaticAuth(id, auth_token) {
    if (!id || !auth_token) {
      navigate('login');
    }

    axios
      .post('http://127.0.0.1:8000/api/automatic_login', {
        auth_token: auth_token,
      })
      .then(res => {
        if (res.data == 'Token is invalid') {
          navigate('login');
        } else {
          setUser({ id: id, auth_token: auth_token, logged_in: true });
          navigate('/');
        }
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    const id = localStorage.getItem('user_id');
    const auth_token = localStorage.getItem('auth_token');

    automaticAuth(JSON.parse(id), JSON.parse(auth_token));
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
        <Route exact path='login' element={<Login />} />
        <Route exact path='register' element={<Register />} />
        <Route
          exact
          path='job_scope'
          element={
            <RequireAuth>
              <JobScope />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='settings'
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
