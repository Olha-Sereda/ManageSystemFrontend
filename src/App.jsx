import { Navigate, Outlet } from 'react-router-dom';
import MainLayoutPage from '@/page/MainLayoutPage.jsx';
import LoginPage from '@/page/pages/LoginPage.jsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useGetSession, useSetSession } from './store/reducers/sessionSlice';

function PrivateRoutes() {
  const session = useGetSession();
  const setSession = useSetSession();
  const token = localStorage.getItem('token');

  console.log('SESSION:', session);
  if (token) {
    setSession(true);
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<PrivateRoutes />}>
          <Route index element={<Navigate to="/servers" replace />} />

          <Route path={'/*'} element={<MainLayoutPage />} />
        </Route>
        <Route path={'/login'} element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
