import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../screens/Home';

const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='home' />} />
        <Route exact path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
