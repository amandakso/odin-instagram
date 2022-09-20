import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
} from "../firebase/firebase.config";
import "../styles/Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const[user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    
    const isPasswordConfirmed = (password,confimPassword) => {
        if(password && confimPassword && password === confimPassword) return true;
        return false;
    }

    const register = () => {
        if (!isPasswordConfirmed(password, confirmPassword)) alert ("Passwords don't match");
        if(!name) alert ("Please enter name");
        registerWithEmailAndPassword(username, name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading, navigate])

    return (
        <div className="register">
            <div className="register_container">
                <input
                    type="text"
                    className="register_textBox"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input 
                    type="text"
                    className="register_textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    className="register_textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
                <input
                    type="password"
                    className="register_textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    type="password"
                    className="register_textBox"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                />
                <button className="register_btn" onClick={register}>
                    Register
                </button>
                <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </div>
        </div>
    )
}

export default Register;