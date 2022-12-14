import React, { useEffect, useState } from 'react';
import { getProfileInfo, followAccount, unfollowAccount } from '../firebase/firebase.config';
import "../styles/ProfileNumbers.css";
import UsersModal from './UsersModal';

const ProfileNumbers = (props) => {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followStatus, setFollowStatus] = useState("");
    const [updateNumbers, setUpdateNumbers] = useState(true);
    const [ followersClicked, setFollowersClicked] = useState(false);
    const [ followingClicked, setFollowingClicked] = useState(false);
    
    const follow = async (account, user) => {
        try {
            await followAccount(account, user);
            setFollowStatus(true);
            setUpdateNumbers(true);
        } catch (err) {
            console.error(err);
        }
    };

    const unfollow = async (account, user) => {
        try {
            await unfollowAccount(account, user);
            setFollowStatus(false);
            setUpdateNumbers(true);
        } catch (err) {
            console.error(err);
        }
    };

    const switchToFollower = () => {
        setUpdateNumbers(true);
        changeFollowerClick();
    };

    const switchToFollowing = () => {
        setUpdateNumbers(true);
        changeFollowingClick();
    };

    const changeFollowerClick = () => {
        if (followersClicked) {
            setFollowersClicked(false);
            
        } else {
            setFollowersClicked(true);
        }
    };

    const changeFollowingClick = () => {
        if (followingClicked) {
            setFollowingClicked(false);          
        } else {
            setFollowingClicked(true);
        }
    };

    useEffect(() => {
        let status = false;
        for (let i = 0; i < followers.length; i++) {
            if (followers[i].follower === props.user.uid) {
                status = true;
            };
        };
        if (status) {
            setFollowStatus(true);
        } else {
            setFollowStatus(false);
        }
    }, [followers, props.user])

    useEffect(() => {
        if(props.uid === props.user.uid) {
            setUpdateNumbers(true);
        }
    },[props.uid, props.user])

    useEffect (() => {
        if (updateNumbers) {
            (async () => {
                const info = await getProfileInfo(props.uid);
                setPosts(info[0].info);
                setFollowers(info[1].info);
                setFollowing(info[2].info); 
                setUpdateNumbers(false);        
            })();
        }
    },[updateNumbers, props.uid, props.user]); 

    return (
        <div className="profile-right-container">
            <div className="numbers-container">
                <div className="posts numbers">
                    <p>{posts.length}</p>
                    <p>posts</p>
                </div>
                <div className="followers numbers">
                    <p onClick={() => changeFollowerClick()}>{followers.length}</p>
                    <p>followers</p>
                    { followersClicked
                    ? <div className="popup"><UsersModal update={switchToFollower} onClick={changeFollowerClick} userType={"follower"} accounts={followers}/></div>
                    : null
                    } 
                </div>
                <div className="following numbers">
                    <p onClick={() => changeFollowingClick()}>{following.length}</p>
                    <p>following</p>
                    { followingClicked
                    ? <div className="popup"><UsersModal update={switchToFollowing} onClick={changeFollowingClick} userType={"following"} accounts={following}/></div>
                    : null
                    } 
                </div>
            </div>
            { props.uid !== props.user.uid &&             
                <div>
                    { followStatus 
                        ? <button onClick={() => unfollow(props.uid, props.user.uid)} className="follow">Unfollow</button>
                    : <button onClick={() => follow(props.uid, props.user.uid)} className="follow">Follow</button>
                } 
                </div> 
            }         
        </div>
    )
}

export default ProfileNumbers;