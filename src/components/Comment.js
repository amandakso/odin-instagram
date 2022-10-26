import React, { useContext, useEffect, useState } from "react";
import { deleteComment, getUsername } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/close-thick.png";

export default function Comment(props) {
    const [username, setUsername] = useState("");
    const [deleteOption, setDeleteOption] = useState("false");
    const { currentUser } = useContext(AuthContext);

    const askDeleteComment = async (post, owner, commenter, user, reference) => {
        try {
            await deleteComment(post, owner, commenter, user.uid, reference);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            return
        } else {
            if (currentUser.uid === props.info.commenter) {
                setDeleteOption(true);
            } else {
                setDeleteOption(false);
            }
        }
    }, [currentUser, props.info])
    
    useEffect(() => {
        (async () => {
            let name = await getUsername(props.info.commenter);
            setUsername(name);
        })(); 
    }, [props.info.commenter]);

    return (
        <div className={props.info.post}>
            <p>
                <Link className="text-link" to={`/users/${username}`}><strong>{username}</strong></Link>
                <span> {props.info.comment}</span>
                {
                    deleteOption
                    ? <span className="delete"><img onClick={() => askDeleteComment(props.info.post, props.info.owner, props.info.commenter, currentUser, props.info.ref)}src={deleteIcon} alt="delete"/></span>
                    : null
                }
            </p>     
        </div>

    )
}