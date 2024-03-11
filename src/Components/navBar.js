import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {   
    const user = false;
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark custom-navbar bg-black">
            <h4>Task-Mang</h4>
            <button
                className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText" > 
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    {!user && (
                    <>
                    <li className="nav-item">
                        <NavLink to={'/login'} className="nav-link">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/register'} className="nav-link">Register</NavLink>
                    </li>
                    </>
                    )}
                </ul>
                <span className="navbar-text">
                    {user ? (
                        <p>Welcome, username</p>
                        ) : (
                        <p>Welcome, Guest</p>
                    )}
                </span>
            </div>
        </nav>
    );
}

export default NavBar;
