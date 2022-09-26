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
        <div style ={{display: 'none'}} className={props.info.post}>
            <p><strong>{username}</strong><span> {props.info.comment}</span></p>     
        </div>

    )
}