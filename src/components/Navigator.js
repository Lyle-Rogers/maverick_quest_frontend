import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../screens/Home';

const Navigator = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='home' />} />
      <Route exact path='/home' element={<Home />} />
    </Routes>
  );
};

export default Navigator;
