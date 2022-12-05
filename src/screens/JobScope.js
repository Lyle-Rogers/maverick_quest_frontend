import { useContext } from 'react';
import '../styles/JobScope.scss';

import { UserContext } from '../App';

export default function JobScope() {
  const { user } = useContext(UserContext);

  return (
    <div
      className='jobScopeContainer'
      style={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        color: 'white',
        fontSize: '17px',
      }}>
      Job Scoped
    </div>
  );
}
