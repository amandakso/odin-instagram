import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, loginGuest } from "../firebase/firebase.config";
import "../styles/Login.css";

function Login() {
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard");
            return
        }
    }, [currentUser, navigate]);
    
    return (
        <div className="login">
            <div className="login_container">
                <p className="handlee">Pandagram</p>
                <input 
                    type="text"
                    className="login_textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
                <input 
                    type="password"
                    className="login_textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login_btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
                <button 
                    className="guest_btn"
                    onClick= {() => loginGuest()}
                >
                    Try Guest Account
                </button>
            </div>
        </div>
    )
}

export default Login;
