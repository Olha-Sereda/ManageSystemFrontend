// import Navbar from "@/components/navbar/Navbar.jsx";
// import {useRoutes} from "react-router-dom";
// import ServersPage from "@/page/pages/ServersPage.jsx";
// import TestsPage from "@/page/pages/TestsPage.jsx";
// import UsersPage from "@/page/pages/UsersPage.jsx";
// import ServicesPage from "@/page/pages/ServicesPage.jsx";
// import TemplatesPage from "@/page/pages/TemplatesPage.jsx";
// import LoginPage from "./pages/LoginPage";

// export default function MainLayoutPage() {
//     let element = useRoutes([
//         {
//             path: "/servers",
//             element: <ServersPage />,
//             // children: [
//             //     {
//             //         path: "/:id",
//             //         element: <ServersPage />,
//             //     },
//             // ]
//         },
//         {
//             path: "/tests",
//             element: <TestsPage />,
//         },
//         {
//             path: "/templates",
//             element: <TemplatesPage />,
//         },
//         {
//             path: "/users",
//             element: <UsersPage />,
//         },
//         {
//             path: "/server/:id",
//             element: <ServicesPage />,
//         },
//         {
//             path: "/login",
//             element: <LoginPage />,
//         },
//     ]);
//     return (
//         <>
//             <Navbar/>
//             {element}
//         </>
//     )
// }

import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar.jsx';
import ServersPage from '@/page/pages/ServersPage.jsx';
import TestsPage from '@/page/pages/TestsPage.jsx';
import UsersPage from '@/page/pages/UsersPage.jsx';
import ServicesPage from '@/page/pages/ServicesPage.jsx';
import TemplatesPage from '@/page/pages/TemplatesPage.jsx';
import LoginPage from './pages/LoginPage';
import ResultLogPage from './pages/ResultLogPage';

export default function MainLayoutPage() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ServersPage />} />
        <Route path="/servers" element={<ServersPage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/server/:id" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test/:testId/resultlog" element={<ResultLogPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
}
