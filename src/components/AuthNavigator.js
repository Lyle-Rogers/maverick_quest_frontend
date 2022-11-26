import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='login' />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthNavigator;
