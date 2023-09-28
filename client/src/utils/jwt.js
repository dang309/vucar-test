import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
//
import { SFACE_JWT_COOKIE } from './constant';

// ----------------------------------------------------------------------

const isValidToken = (token) => {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (token) => {
  if (token) {
    Cookies.set(SFACE_JWT_COOKIE, token);
  } else {
    Cookies.remove(SFACE_JWT_COOKIE);
  }
};

export { isValidToken, setSession };
