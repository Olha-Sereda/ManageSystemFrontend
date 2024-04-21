import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayoutPage from "@/page/MainLayoutPage.jsx";
import LoginPage from "@/page/pages/LoginPage.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";




function App() {

  return (

    <Router>
      <Routes>
        <Route path={"/*"} element={<MainLayoutPage />} />
        <Route path={"/login"} element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
