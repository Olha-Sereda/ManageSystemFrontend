import { Navigate, Outlet } from 'react-router-dom';
import MainLayoutPage from '@/page/MainLayoutPage.jsx';
import LoginPage from '@/page/pages/LoginPage.jsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function PrivateRoutes() {
  const session = true;

  if (session) {
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
