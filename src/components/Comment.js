import React, {useEffect, useState} from "react";
import { getUsername } from "../firebase/firebase.config";
import { Link } from "react-router-dom";

export default function Comment(props) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        (async () => {
            let name = await getUsername(props.info.commenter);
            setUsername(name);
        })(); 
    }, [props.info.commenter])
    return (
        <div className={props.info.post}>
            <p><Link className="text-link" to={`/users/${username}`}><strong>{username}</strong></Link><span> {props.info.comment}</span></p>     
        </div>

    )
}