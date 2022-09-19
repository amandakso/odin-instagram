import React, { useEffect, useState} from "react";
import { Link, redirect } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            return redirect("/dashboard");
        }
    }, [user, loading]);
    return (
        <div className="login">
            <div className="login_container">
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
            </div>
        </div>
    )
}

export default Login;
