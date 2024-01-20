import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {

    const [credentials, setCredentials] = useState({
        name:'',
        password:'',
        email:'',
        cpassword:''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        const response = await fetch(`https://inotebook-backend-r7xz.onrender.com/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/home');
            props.showAlert('Account created successfully', 'success')
        } else {
            props.showAlert('Invalid details', 'danger')
        }
    }

    const onChange=(e)=>{    
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
        <h2>Sign Up to iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={onChange} id="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" onChange={onChange} minLength={5} required id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" name='cpassword' className="form-control" onChange={onChange} required id="cpassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
export default SignUp;