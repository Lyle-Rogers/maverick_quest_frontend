import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import '../styles/Home.scss';

import { UserContext } from '../App';

export default function Home() {
  const [user, setUser] = useContext(UserContext);

  return <div className='homeContainer'>Home screen {user?.id}</div>;
}
