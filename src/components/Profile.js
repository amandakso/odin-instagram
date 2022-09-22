import React, { useEffect, useContext, useState } from "react";
import Navbar from './Navbar';
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { getProfile } from "../firebase/firebase.config";
import ProfileNumbers from './ProfileNumbers';


const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, loading, error] = useAuthState(auth);
    const username = useParams().username;
    const [uid, setUid] = useState("");
    const navigate = useNavigate();

    useEffect (() => {
        (async () => {
            const info = await getProfile(username);
            setUid(info.uid);
        })();
        
    }, [username])

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
            { uid
                ? <ProfileNumbers uid={uid} />
                : null
            }
        </div>
    )
}

export default Profile;