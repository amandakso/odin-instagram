import React, { useState, useEffect }from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import DefaultAvatar from "./DefaultAvatar";

const Avatar = (props) => {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        (async () => {
            try {
                if (!props.user.photoURL) {
                    setAvatar(<DefaultAvatar />);
                } else {
                    await getDownloadURL(ref(storage, props.user.photoURL))
                    .then((url) => {
                        setAvatar(<img style={{borderRadius: "50%", width: "80px"}} src={url} alt="profile" />);
                    })
                }
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    },[props.user.photoURL])

    return (
        <div>
            {avatar}
        </div>
    )
}

export default Avatar;