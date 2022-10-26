import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import Navbar from "./Navbar";
import Error from "./Error";
import Feed from "./Feed";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [page, setPage] = useState(<div></div>) 
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) {
            setPage(<div>Loading...</div>);
        } else if (user) {
            setPage(
                <div>
                    <Navbar />
                    <div className="main">
                        <Feed />
                    </div>
                </div>
            );
        } else if (error) {
            setPage(<div><Error /></div>);
        } else {
            navigate("/logout");
            return;
        }
    }, [navigate, loading, user, error]);

    return (
        <div>
            {page}
        </div>
    )
}

export default Dashboard;