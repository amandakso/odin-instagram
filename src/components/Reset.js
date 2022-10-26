import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../firebase/firebase.config";
import "../styles/Reset.css";

function Reset() {
    const [email, setEmail] = useState("");

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