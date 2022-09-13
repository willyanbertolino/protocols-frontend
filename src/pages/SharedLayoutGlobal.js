import { Outlet } from 'react-router-dom';
import { Footer } from '../components';

const SharedLayoutGlobal = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayoutGlobal;
