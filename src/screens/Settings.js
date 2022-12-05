import { useContext } from 'react';
import '../styles/Settings.scss';

import { UserContext } from '../App';

export default function Settings() {
  const { user } = useContext(UserContext);

  return <div className='settingsContainer'>Settings {user.id}</div>;
}
