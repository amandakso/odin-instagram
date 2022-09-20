import React, { useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase/firebase.config";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        if(!currentUser) {
            navigate("/");
            return;
        }
    }, [currentUser, loading]);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default Dashboard;