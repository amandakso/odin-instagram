import React, { useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase/firebase.config";
import "../styles/Reset.css";

function Reset() {
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
    }, [loading]);

    return (
        <div className="reset">
            <div className="reset_container">
                <h3>Trouble Logging In?</h3>
                <p>Enter your email and we'll send a link to get back into your account. </p>
                <input
                    type="text"
                    className="reset_textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                />
                <button
                    className="reset_btn"
                    onClick={() => sendPasswordReset(email)}
                >
                    Send password reset email
                </button>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    )
}

export default Reset;