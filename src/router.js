import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./Components/loginPage";
import RegisterPage from "./Components/registerPage";

const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'/login',element:<LoginPage/>},
    {path:'/register',element:<RegisterPage/>}
]);

export default router;