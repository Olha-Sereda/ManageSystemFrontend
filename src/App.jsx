import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayoutPage from "@/page/MainLayoutPage.jsx";


const router = createBrowserRouter([
    {
        path: "/*",
        element: <MainLayoutPage />,
    },
    // {
    //     path: "/login",
    //     element: <LoginPage />,
    // },
]);

function App() {

  return (
      <RouterProvider
          router={router}
          // fallbackElement={<BigSpinner />}
      />
  )
}

export default App
