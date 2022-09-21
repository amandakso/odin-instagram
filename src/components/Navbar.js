import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase.config";
import "../styles/Navbar.css";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        if(!currentUser) {
            navigate("/");
            return;
        }
    }, [currentUser, navigate, user, loading]);



    return (
        <nav className="nav">
            <ul className="nav-links">
                <li><Link className="nav-link" to='/dashboard'>Home</Link></li>
                <li><Link className="nav-link" to='/addPhoto'>add Post</Link></li>
                { currentUser
                    ? <li><Link className="nav-link" to={`/users/${currentUser.displayName}`}>Profile</Link></li>
                    : <li><Link className="nav-link" to="/">Profile</Link></li>
                }
                <li><button className="nav-link" onClick={logout}>Log out</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;