import Navbar from "@/components/navbar/Navbar.jsx";
import {useRoutes} from "react-router-dom";
import ServersPage from "@/page/pages/ServersPage.jsx";
import TestsPage from "@/page/pages/TestsPage.jsx";
import UsersPage from "@/page/pages/UsersPage.jsx";


export default function MainLayoutPage() {
    let element = useRoutes([
        {
            path: "/servers", 
            element: <ServersPage />,
            // children: [
            //     {
            //         path: "/:id",
            //         element: <ServerPage />,
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
    ]);
    return (
        <>
            <Navbar/>
            {element}
        </>
    )
}