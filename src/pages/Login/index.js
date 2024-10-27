import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/authentication";

// import * as authenticationService from "../../services/authenticationService";
import "./Login.css"
function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginBtn = async () => {

        if (username.trim() === '' || password.trim() === '') {
            alert("Please enter all information login");
            return;
        }

        const loginRequest = {
            username: username,
            password: password
        }
        
        const res = await login(loginRequest)
        if (res.status == 200){
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            navigate("/home");
        }else{
            alert("Login failed");
        }
    }



    return (
        <div className="login container-fluid mh-100  d-flex align-items-center justify-content-center">
            <div className="login-cart  p-4">
                <h2 className="text-center">Login</h2>
                <hr></hr>

                <div className="mb-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <br></br>
                    <input type="text" className="w-100 h-100"
                        id="email" placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <br />
                    <input type="password" className="w-100 h-100"
                        id="password" placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <button className="btn btn-light rounded-pill w-100 fw-bold" onClick={handleLoginBtn}>Login</button>


                <div className="text-center mt-3 d-flex ">
                    <Link to="/register" className="text-decoration-none text-light">Register</Link>
                    <a href="#" className="text-decoration-none ms-auto text-light">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;