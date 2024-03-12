import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Styles/login.css";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { setUser } from "../store/authSlice";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import NavBar from "./navBar";


function LoginPage(){
	const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
	const [errormsg,setErrormsg]=useState('')
	const navigate=useNavigate();
	const dispatch=useDispatch();

	function loginUser(event){
		event.preventDefault();
		const user={
			username:username,
			password:password
		}
		axios.post('http://127.0.0.1:8000/login',user).then(response=>{
			setErrormsg('')
			var user={
				id:response.data.id,
				username:username,
				token:response.data.token
			}
			dispatch(setUser(user))
			toastr.success('Logged Successfully')
		navigate('/dashboard')
		}).catch(error=>{
			console.log(error)
		})
	}
    return(
        <>
		<NavBar/>
		<div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <h3 id="form-title">LOGIN</h3>
                    </div>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={loginUser}>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="text" name="username" placeholder="Username" className="form-control" value={username} onInput={(event)=>setUsername(event.target.value)} required="required" />
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
								<input type="password" name="password" placeholder="Password" className="form-control" value={password} onInput={(event)=>setPassword(event.target.value)} required="required" />
						</div>
						<div className="d-flex justify-content-center mt-3 login_container">
                            <input className="btn login_btn" type="submit" value="Login" />
                        </div>
					</form>
				</div>
                <div className="mt-4">
					<div className="d-flex justify-content-center links">
						Don't have an account? <Link to={'/register'} className="ml-2">Sign Up</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
		</>
    )
}

export default LoginPage;