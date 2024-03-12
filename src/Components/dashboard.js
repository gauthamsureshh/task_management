import React from "react";
import NavBar from "./navBar";
import Status from "./status";
import "../Styles/dashboard.css";
import checkAuth from "../auth/checkAuth";

function Dashboard(){
    return(
        <>
            
            <div className="container-fluid">
            <NavBar/>
            <Status/>
            </div>
            
        </>
    )
}

export default checkAuth(Dashboard);