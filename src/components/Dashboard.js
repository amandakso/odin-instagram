import React, { useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import Navbar from "./Navbar";
import Feed from "./Feed";

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
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
                        <Feed currentUser={user.uid}/>
                    </div>
                </div>
            )
        } else if (error) {
            setPage(<div>Error...</div>)
        } else {
            navigate("/");
            return;
        }
    }, [ navigate, loading, user, error]);

    return (
        <div>
            {page}
        </div>
    )
}

export default Dashboard;