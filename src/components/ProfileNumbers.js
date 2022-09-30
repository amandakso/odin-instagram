import React, { useEffect, useState } from 'react';
import { getProfileInfo } from '../firebase/firebase.config';
import "../styles/ProfileNumbers.css";

const ProfileNumbers = (props) => {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followStatus, setFollowStatus] = useState("");

    
    useEffect (() => {
        (async () => {
            const info = await getProfileInfo(props.uid);
            console.log(props.user.uid);
            console.log(props.uid);
            let status = false;
            for (let i = 0; i < info[1].info.length; i++) {
                if (info[1].info[i] === props.user.uid) {
                    status = true;
                };
            };
            if (status) {
                setFollowStatus(true);
            } else {
                setFollowStatus(false);
            }
            setPosts(info[0].info);
            setFollowers(info[1].info);
            setFollowing(info[2].info);         
        })();
    },[props.uid, props.user]); 
    return (
        <div className="profile-right-container">
            <div className="numbers-container">
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
            <button className="follow">Follow</button>
        </div>
    )
}

export default ProfileNumbers;