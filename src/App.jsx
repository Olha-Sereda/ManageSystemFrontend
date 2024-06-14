import { Navigate, Outlet, RouterProvider } from 'react-router-dom';
import MainLayoutPage from '@/page/MainLayoutPage.jsx';
import LoginPage from '@/page/pages/LoginPage.jsx';
import { Route, BrowserRouter as Router, Routes, createBrowserRouter } from 'react-router-dom';
import { useGetSession, useSetSession } from './store/reducers/sessionSlice';
import MainPageWithNote from './page/pages/MainPageWithNote';
import ServersPage from './page/pages/ServersPage';
import TestsPage from './page/pages/TestsPage';
import TemplatesPage from './page/pages/TemplatesPage';
import UsersPage from './page/pages/UsersPage';
import ServicesPage from './page/pages/ServicesPage';
import ResultLogPage from './page/pages/ResultLogPage';
import { useUserRoles } from '@/hooks/useUserRoles';

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
const ProtectedRoutes = ({ children, min_role_lvl, redirectURL = '/' }) => {
  const { checkRole } = useUserRoles();
  return checkRole(min_role_lvl) ? children : <Navigate to={redirectURL} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <MainLayoutPage />,
        children: [
          {
            path: '/',
            element: <MainPageWithNote />,
          },
          {
            path: '/users',
            element: (
              <ProtectedRoutes min_role_lvl={'ROLE_ADMIN'} redirectURL={'/'}>
                <UsersPage />
              </ProtectedRoutes>
            ),
          },
          {
            path: '/servers',
            element: <ServersPage />,
          },
          {
            path: '/tests',
            element: <TestsPage />,
          },
          {
            path: '/templates',
            element: <TemplatesPage />,
          },
          {
            path: '/server/:id',
            element: <ServicesPage />,
          },
          {
            path: '/test/:testId/resultlog',
            element: <ResultLogPage />,
          },
          {
            path: '/*',
            element: <div>404</div>,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
