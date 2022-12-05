import { useContext, useState } from 'react';
import '../styles/Home.scss';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

import { UserContext } from '../App';

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userJobScopes, setUserJobScopes] = useState([
    {
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope. That Job Scope. ',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope. asdfasdfasdf df asdf asdf asdf sdf ',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope. asdfsadfadsfasdfasdfasdfasdfasdfasdfsadfsadf',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
  ]);

  function renderJobScopes() {
    return userJobScopes.map(userJobScope => {
      return (
        <div className='jobScope' onClick={() => navigate('job_scope')}>
          <div className='title'>{userJobScope.job_scope.name}</div>
          <img
            src={require('../assets/RoomThumbnail.jpg')}
            className='firstStepImg'
          />
          <div className='timeEnds'>Time ends {userJobScope.time_ends}</div>
        </div>
      );
    });
  }

  return (
    <div className='homeContainer'>
      <Header />
      <div className='jobScopesContainer'>{renderJobScopes()}</div>
    </div>
  );
}
