import { useContext } from 'react';
import '../styles/Home.scss';

import { UserContext } from '../App';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className='homeContainer' onClick={localStorage.clear()}>
      Home screen
      {user?.id}
    </div>
  );
}
