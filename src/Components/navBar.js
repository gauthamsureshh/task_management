import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios from 'axios';
import { removeUser } from "../store/authSlice";

function NavBar() {   
    const user=useSelector(store=>store.auth.user);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function logout(){
        if(user){
            axios.post('url',{},{
                headers:{'Authorization':'Bearer'+user.token}
            })
            toastr.error('Logged Out')
            dispatch(removeUser())
            navigate('/login')

        }
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-black">
            <h4 style={{color:'white'}}>TaskTerra</h4>
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
                    {!user ? (
                    <>
                    <li className="nav-item">
                        <NavLink to={'/login'} className="nav-link">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/register'} className="nav-link">Register</NavLink>
                    </li>
                    </>
                    ) : (
                    <li className="nav-item">
                        <NavLink to={'/dashboard'} className="nav-link">DashBoard</NavLink>
                    </li>
                    )}
                </ul>
                <ul className="navbar-nav" style={{ float: "left" , color:'white'}}>
                    {user ? (
                        <>
                        <li className="nav-item">Welcome,{user.username}</li>
                        <span>
                        <li className="nav-item  btn btn-sm" style={{color:'white'}} onClick={logout} >Logout</li>
                        </span>
                        </>
                        ) : (
                        <li className="nav-item">Welcome, Guest</li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
