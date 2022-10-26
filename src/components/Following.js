import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../firebase/firebase.config";
import Avatar from "./Avatar";

const Following = (props) => {
    const [username, setUsername] = useState(null);
    const[fullName, setFullName] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let profileData = await getProfileData(props.account.following);
                setUsername(profileData.displayName);
                setFullName(profileData.name);
            } catch (err) {
                console.error(err);
            }
        })();
    },[props.account]);

    return (
        <div>
            <Link className="user"onClick={() => props.update()}to={`/users/${username}`}>
                <div className="user-left">
                    <Avatar user={props.account.following}/>
                </div>
                <div className="user-right">
                    <p><strong>{username}</strong></p>
                    <p>{fullName}</p>
                </div>
            </Link>
        </div>
    )
}

export default Following;