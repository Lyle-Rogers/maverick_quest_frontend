import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

export const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user.logged_in) {
    return <Navigate to='/login' />;
  }

  return children;
};
