import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom';

const Navbar = () =>{
    const loacation = useLocation();
    let Navigate = useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        Navigate('/login'); 
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Notify</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${loacation.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link >
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${loacation.pathname === '/about' ? "active" : ""}`} to="/about">About</Link >
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="#">Pricing</Link >
                            </li> */}
                        </ul>
                    </div>
                    {!localStorage.getItem('token')?<form className='d-flex'>
                    <Link className='btn btn-primary' to={'/login'}>Login</Link>
                    <Link className='btn btn-primary mx-3' to={'/signup'}>SignUp</Link>
                    </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                </div>
            </nav>
        </div>
    )
}
export default Navbar;
