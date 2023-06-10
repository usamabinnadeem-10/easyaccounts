// React
import { useEffect } from 'react';

// React Router
import { useLocation, useHistory } from 'react-router-dom';

export const useGoBack = (uuid) => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    return () => {
      if (history.action === 'POP') {
        const pathArray = location.pathname.split('/');
        pathArray[pathArray.length - 1] = uuid;
        const path = pathArray.join('/').replace('/receipt', '');
        history.replace(path);
      }
    };
  }, [location, history, uuid]);

  return null;
};
