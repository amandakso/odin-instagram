import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../firebase/firebase.config";
import Avatar from "./Avatar";

const SearchResult = (props) => {
    const [username, setUsername] = useState(null);
    const[fullName, setFullName] = useState(null);

    useEffect(() => {
        let profileData = props.account;
        setUsername(profileData.displayName);
        setFullName(profileData.name);
        console.log("check");
    },[props.account]);

    return (
        <div>
            <Link className="user"onClick={() => props.update()}to={`/users/${username}`}>
                <div className="user-left">
                    <Avatar user={props.account.uid}/>
                </div>
                <div className="user-right">
                    <p><strong>{username}</strong></p>
                    <p>{fullName}</p>
                </div>
            </Link>
        </div>
    )
}

export default SearchResult;