import React, {useEffect} from 'react';
import useAuthContext from '../hooks/useAuthContext';

function Logout(props) {
  const {logout} = useAuthContext();

  useEffect(function () {
    logout();
  });

  return null;
}

export default Logout;