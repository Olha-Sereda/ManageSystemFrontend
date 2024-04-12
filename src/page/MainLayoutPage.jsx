import Navbar from "@/components/navbar/Navbar.jsx";
import {useRoutes} from "react-router-dom";
import ServersPage from "@/page/pages/ServersPage.jsx";
import TestsPage from "@/page/pages/TestsPage.jsx";
import UsersPage from "@/page/pages/UsersPage.jsx";
import ServicesPage from "@/page/pages/ServicesPage.jsx";


export default function MainLayoutPage() {
    let element = useRoutes([
        {
            path: "/servers", 
            element: <ServersPage />,
            // children: [
            //     {
            //         path: "/:id",
            //         element: <ServersPage />,
            //     },
            // ]
        },
        {
            path: "/tests",
            element: <TestsPage />,
        },
        {
            path: "/users",
            element: <UsersPage />,
        },
        {
            path: "/server/:id",
            element: <ServicesPage />,
        },
    ]);
    return (
        <>
            <Navbar/>
            {element}
        </>
    )
}