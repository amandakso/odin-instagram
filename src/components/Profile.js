import React, { useEffect, useContext, useState } from "react";
import Navbar from './Navbar';
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { getProfile, getPosts } from "../firebase/firebase.config";
import DefaultAvatar from "./DefaultAvatar";
import ProfileNumbers from './ProfileNumbers';
import Grid from "./Grid";
import "../styles/Profile.css";


const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, loading, error] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const username = useParams().username;
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        if(!currentUser) {
            navigate("/");
            return;
        }
    }, [currentUser, navigate, loading]);

    useEffect (() => {
        (async () => {
            const info = await getProfile(username);
            setUid(info.uid);
            setName(info.name)
        })();
        
    }, [username]);

    useEffect(() => {
        (async () => {
            const content = await getPosts(currentUser.uid);
            setPosts(content);
        })();
    },[currentUser]);

    return (
        <div>
            <Navbar />
            <div className="overlay">
                <div className="profileHeader">
                    <div className="profile-left">
                        <DefaultAvatar />
                        <div>{name}</div>
                    </div>
                    <div className="profile-right">
                        { uid
                            ? <ProfileNumbers uid={uid} />
                            : null
                        }
                    </div>            
                </div>
                <Grid photos={posts} />
            </div>
        </div>
    )
}

export default Profile;