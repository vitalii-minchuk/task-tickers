import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useAppDispatch } from './hooks';
import { closeConnection, createConnection } from './store/Slices/tickersSlice';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createConnection());
    const close = () => {
      dispatch(closeConnection());
    };
    return () => close();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
