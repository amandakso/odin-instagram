import React, { useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.config";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "./Navbar";

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
    }, [currentUser, navigate, loading]);

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Dashboard;