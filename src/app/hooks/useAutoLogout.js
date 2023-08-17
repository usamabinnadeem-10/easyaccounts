import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth';
import { useIdleTimer } from 'react-idle-timer';

export const useAutoLogout = (timeout = 600000) => {
  const dispatch = useDispatch();

  const onIdle = () => dispatch(logout());

  useIdleTimer({
    onIdle,
    timeout,
    throttle: 500,
  });
};
