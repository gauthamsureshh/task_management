import React,{useState} from "react";
import "../Styles/register.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage(){
	const [username,setUserName]=useState('')
	const [email,setEmail]=useState('')
	const [password,setPassword]=useState('')
	const [passwordConf,setPasswordConf]=useState('')
	const [errormsg,setErrormsg]=useState({})
	const navigate=useNavigate()

	function registerUser(event){
		event.preventDefault();
		const user={
			username:username,
			email:email,
			password1:password,
			password2:passwordConf
		}
		axios.post('http://127.0.0.1:8000/register',user).then(response=>{
			setErrormsg('')
			navigate('/')
		}).catch(error=>{
			console.log(`Error is ${error}`)
			if(error.response.data){
				setErrormsg(error.response.data)
			}
			else{
				setErrormsg("API Connection Failed..!")
			}
		})
	}
	
    return(
	<div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
					<h3 id="form-title">REGISTER ACCOUNT</h3>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={registerUser}>
					{errormsg.username && <div className="error">{errormsg.username}</div>}
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="text" name="username" placeholder="Username" className="form-control" value={username} onInput={(event=>setUserName(event.target.value))} required />
						</div>
						{errormsg.email && <div className="error">{errormsg.email}</div>}
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-envelope-square"></i></span>
							</div>
							<input type="email" name="email" placeholder="Email" className="form-control" value={email} onInput={(event=>setEmail(event.target.value))} required />
						</div>
						{errormsg.password1 && <div className="error">{errormsg.password1}</div>}
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" placeholder="Password" className="form-control"  value={password} onInput={(event=>setPassword(event.target.value))} required  />
						</div>
						{errormsg.password2 && <div className="error">{errormsg.password2}</div>}
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password"  placeholder="Confirm Password" className="form-control"  value={passwordConf} onInput={(event=>setPasswordConf(event.target.value))} required />
						</div>
						<div className="d-flex justify-content-center mt-3 login_container">
							<button className="btn login_btn" type="submit" >Register </button>
						</div>
					</form>
				</div>
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
						Already have an account? <Link to={'/login'} className="ml-2">Login</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}

export default RegisterPage;