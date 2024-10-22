import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { register } from "../../services/authentication";
import "./Register.css"

import "../Login/Login.css"
function Register() {
    const initRegisterRequest = {
        username: '',
        password: '',
        name: ''
    };
    const navigate = useNavigate();
    const [registerRequest, setRegisterRequest] = useState(initRegisterRequest);
    const onChangeRequest = (e) => {
        setRegisterRequest(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const isFormValid = () => {
        const fieldsToCheck = ['username', 'password', 'name'];
        return fieldsToCheck.every(field => registerRequest[field].trim() !== '');
    };

    const handleSubmitRequest = async () => {
        const res = await register(registerRequest);
        console.log(res);
        if (res.status === 200) {
            console.log("register successfully");
            navigate("/");
        } else {
            alert(res.data.message);
        }
    }

    return (
        <div className="login container-fluid mh-100  d-flex align-items-center justify-content-center">
            <div className="login-cart  p-4">
                <h2 className="text-center">Register</h2>
                <hr></hr>

                <div className="mb-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <br></br>
                    <input type="text" className="w-100 h-100"
                        id="username" placeholder="Enter your username"
                        name="username" value={registerRequest.username.trim()}
                        onChange={onChangeRequest} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <br />
                    <input type="password" className="w-100 h-100"
                        id="password" placeholder="Enter your password"
                        name="password" value={registerRequest.password.trim()}
                        onChange={onChangeRequest} />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <br />
                    <input type="text" className="w-100 h-100"
                        id="name" placeholder="Enter your password"
                        name="name" value={registerRequest.name}
                        onChange={onChangeRequest} />
                </div>
                <button className="btn btn-light rounded-pill w-100 fw-bold"
                    onClick={handleSubmitRequest}
                    disabled={!isFormValid()}>
                    Sign up
                </button>


                <div className="text-center mt-3 d-flex ">
                    <Link to="/login" className="text-decoration-none text-light">Have account</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;