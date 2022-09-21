import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase.config";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    console.log(currentUser);

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
                <li><Link to='/dashboard'>Home</Link></li>
                { currentUser
                    ? <li><Link to={`/users/${currentUser.displayName}`}>Profile</Link></li>
                    : <li><Link to="/">Profile</Link></li>
                }
                <li><button onClick={logout}>Log out</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;