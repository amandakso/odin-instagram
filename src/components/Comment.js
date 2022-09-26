import React, {useEffect, useState} from "react";
import { getUsername } from "../firebase/firebase.config";

export default function Comment(props) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        (async () => {
            let name = await getUsername(props.info.commenter);
            setUsername(name);
        })(); 
    }, [props.info.commenter])
    return (
        <div className="comment">
            <div><strong>{username}</strong></div>
            <div>{props.info.comment}</div>
        </div>

    )
}