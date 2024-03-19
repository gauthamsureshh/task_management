import React from "react";
import NavBar from "./navBar";
import Status from "./status";
import checkAuth from "../auth/checkAuth";

function Dashboard(){
    return(
        <>
            <NavBar/>
            <Status/>
        </>
    )
}

export default checkAuth(Dashboard);