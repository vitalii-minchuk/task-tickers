import { Outlet } from 'react-router-dom';
import Header from '../Header';
import TickersBar from '../TickersBar';

function Layout() {
  return (
    <>
      <Header />
      <TickersBar />
      <Outlet />
    </>
  );
}

export default Layout;
