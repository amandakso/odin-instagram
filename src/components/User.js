import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../firebase/firebase.config";
import Avatar from "./Avatar";

const User = (props) => {
    const [username, setUsername] = useState(null);
    const[fullName, setFullName] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let profileData = await getProfileData(props.follower.follower);
                setUsername(profileData.displayName);
                setFullName(profileData.name);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    },[props.follower]);

    return (
        <div>
            <Link className="user"onClick={() => props.update()}to={`/users/${username}`}>
                <div className="user-left">
                    <Avatar user={props.follower.follower}/>
                </div>
                <div className="user-right">
                    <p><strong>{username}</strong></p>
                    <p>{fullName}</p>
                </div>
            </Link>
        </div>
    )
}

export default User;