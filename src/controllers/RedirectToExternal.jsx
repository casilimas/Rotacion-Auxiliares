import { useEffect } from 'react';

const RedirectToExternal = () => {
  useEffect(() => {
    window.location.href = 'https://casilimas.github.io/Autentication';
  }, []);

  return null;
};

export default RedirectToExternal;
