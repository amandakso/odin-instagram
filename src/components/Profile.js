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
    const [page, setPage] = useState(<div></div>) 
    const navigate = useNavigate();

    useEffect (() => {
        try {
            (async () => {
                const info = await getProfile(username);
                setUid(info.uid);
                setName(info.name)
            })();
        } catch (err) {
            console.error(err);
        }
        
    }, [username]);

    useEffect(() => {
        try {
            (async () => {
                const content = await getPosts(uid);
                setPosts(content);
            })();
        } catch (err) {
            console.error(err);
        }
    },[uid]);

    useEffect(() => {
        if(loading) {
            setPage(<div>Loading...</div>);
        } else if (user) {
            setPage(
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
                                { uid === currentUser.uid
                                    ? null
                                    : <button className="follow">Follow</button>
                                }
                            </div>            
                        </div>
                        <Grid photos={posts} />
                    </div>
                </div>
            )
        } else if (error) {
            setPage(<div>Error...</div>)
        } else {
            navigate("/");
            return;
        }
    }, [ currentUser, name, posts, uid, navigate, loading, user, error]);

    return (
        <div>
            {page}
        </div>
    )
}

export default Profile;