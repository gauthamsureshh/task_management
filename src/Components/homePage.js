import React from "react";
import "../Styles/homepage.css"
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

function HomePage() {
    const user=useSelector(store=>store.auth.user);
    return (
        <div class="container-fluid homepage">
        <div class="card homeCard">
            <h1>TASK TERRA</h1>
            {user ?(
                <div class="buttons">
                <h6>Go to DashBoard,<Link to={'/dashboard'}>Continue</Link></h6>
            </div>
            ):(
                <h5>Let's Get Started,<Link to={'/login'} >Login</Link></h5>
            )}
            
            
                
            
            
        </div>
        
    </div>
        
    );
}

export default HomePage;
