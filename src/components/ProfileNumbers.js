import React, { useEffect, useState } from 'react';
import { getProfileInfo } from '../firebase/firebase.config';
import "../styles/ProfileNumbers.css";

const ProfileNumbers = (props) => {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    
    useEffect (() => {
        (async () => {
            const info = await getProfileInfo(props.uid);
            setPosts(info[0].info);
            setFollowers(info[1].info);
            setFollowing(info[2].info);         
        })();
    },[props.uid]); 
    return (
        <div className="container">
            <div className="posts numbers">
                <p>{posts.length}</p>
                <p>posts</p>
            </div>
            <div className="followers numbers">
                <p>{followers.length}</p>
                <p>followers</p>
            </div>
            <div className="following numbers">
                <p>{following.length}</p>
                <p>following</p>
            </div>
        </div>
    )
}

export default ProfileNumbers;