import React, { useEffect, useState } from "react";
import { storage, getUsername } from "../firebase/firebase.config";
import { ref, getDownloadURL } from "firebase/storage";

const Post = (props) => {
    const [image, setImage] = useState("");
    const [postUser, setPostUser] = useState("...");
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
            <img src={image} alt=""/>
            <p>{postUser}</p>
            <p>{props.info.caption}</p>
        </div>
    )
}
export default Post