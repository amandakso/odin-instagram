import React, { useEffect, useContext, useState } from "react";
import Navbar from './Navbar';
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

const Profile = () => {
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
    }, [currentUser, navigate, loading]);
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Profile;