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
      id: 1,
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 2,
      job_scope: {
        name: 'That Job Scope. That Job Scope. ',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 3,
      job_scope: {
        name: 'That Job Scope. asdfasdfasdf df asdf asdf asdf sdf ',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 4,
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 5,
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 6,
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 7,
      job_scope: {
        name: 'That Job Scope. asdfsadfadsfasdfasdfasdfasdfasdfasdfsadfsadf',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 8,
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
    {
      id: 9,
      job_scope: {
        name: 'That Job Scope.',
      },
      time_ends: 'Feb 19',
    },
  ]);

  function renderJobScopes() {
    return userJobScopes.map(userJobScope => {
      return (
        <a
          key={userJobScope.id}
          className='jobScope'
          onClick={() =>
            navigate('job_scope', { state: { id: userJobScope.id } })
          }>
          <div className='title'>{userJobScope.job_scope.name}</div>
          <img
            src={require('../assets/RoomThumbnail.jpg')}
            className='firstStepImg'
          />
          <div className='timeEnds'>Time ends {userJobScope.time_ends}</div>
        </a>
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
