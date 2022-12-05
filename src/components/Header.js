import { useContext } from 'react';
import '../styles/Header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserContext } from '../App';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className='headerContainer'>
      <div className='sidebarBtn'>
        <FontAwesomeIcon icon='bars' />
      </div>
      <div className='title'>Maverick Quest</div>
      <Link to='settings' className='settingsBtn'>
        <FontAwesomeIcon icon='gear' />
      </Link>
    </div>
  );
}
