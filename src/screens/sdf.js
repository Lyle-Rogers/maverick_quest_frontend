import { useContext } from 'react';
import '../styles/.scss';

import { UserContext } from '../App';

export default function () {
  const { user } = useContext(UserContext);

  return (
    <div
      className='Container'
      style={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        color: 'white',
        fontSize: '17px',
      }}></div>
  );
}
