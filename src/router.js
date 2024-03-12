import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./Components/loginPage";
import RegisterPage from "./Components/registerPage";
import Createtask from "./Components/createTask";
import Assigntask from "./Components/assignTask";
import Dashboard from "./Components/dashboard";

const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'/login',element:<LoginPage/>},
    {path:'/register',element:<RegisterPage/>},
    {path:'/dashboard',element:<Dashboard/>},
    {path:'/createtask',element:<Createtask/>},
    {path:'/assigntask',element:<Assigntask/>}
]);

export default router;