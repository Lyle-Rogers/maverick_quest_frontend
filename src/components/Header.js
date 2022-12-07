import '../styles/Header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <div className='headerContainer' onClick={() => localStorage.clear()}>
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
