import React, { useState,} from "react";
import {useNavigate} from 'react-router-dom'

const Login=(props)=>{

    const [credentials, setCredentials] = useState({
        password:'',
        email:''
    });

    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`https://inotebook-backend-r7xz.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert('Logged in successfully', 'success')
            navigate('/home');
        } else {
            props.showAlert('Invalid credentials', 'danger')
        }

    }

    const onChange=(e)=>{    
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return(
        <>
        <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}
export default Login;