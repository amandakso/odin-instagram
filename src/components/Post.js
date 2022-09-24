import React, { useEffect, useState, useContext } from "react";
import { storage, getUsername, storeComment, getComments } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
import { ref, getDownloadURL } from "firebase/storage";
import DefaultAvatar from "./DefaultAvatar";

const Post = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState("");
    const [postUser, setPostUser] = useState("");
    const [comment, setComment] = useState("");

    const addComment = async () => {
        try {
            await storeComment(props.info.owner, props.info.post, currentUser.uid, comment)
            setComment("");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }

    }
    useEffect(() => {
        (async () => {
                try {
                    await getDownloadURL(ref(storage, props.info.img))
                    .then((url) => {
                        setImage(url);
                    })
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();

    }, [props.info.img, image])

    useEffect(() => {
        (async () => {
                try {
                     let comments = await getComments(props.info.post, props.info.owner);
                     console.log(comments);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();

    }, [props.info.post, props.info.owner])

    useEffect(() => {
        (async () => {
            try {
                console.log(props.info.owner);
                let username = await getUsername(props.info.owner);
                setPostUser(username);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    }, [props.info.owner])
    

    return (
        <div>
            <div className="postHeader">
                <p>{postUser}</p>
                <DefaultAvatar />
            </div>
            <img src={image} alt=""/>
            <div className="postFooter">
                <p>{postUser}</p>
                <p>{props.info.caption}</p>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment..."
                />
                <button onClick={addComment}>Post</button>
            </div>
        </div>
    )
}
export default Post