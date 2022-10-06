import React, { useState, useEffect }from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, getAvatar } from "../firebase/firebase.config";
import DefaultAvatar from "./DefaultAvatar";

const Avatar = (props) => {
    const [avatar, setAvatar] = useState(null);
    const [photo, setPhoto] = useState(null);
    console.log(props.user);

    useEffect(() => {
        (async () => {
            try {
                let fileName = await getAvatar(props.user);
                console.log(fileName);
                setPhoto(fileName);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();  
    },[props.user])

    useEffect(() => {
        (async () => {
            try {
                if (!photo) {
                    setAvatar(<DefaultAvatar />);
                } else {
                    await getDownloadURL(ref(storage, photo))
                    .then((url) => {
                        setAvatar(<img style={{borderRadius: "50%", width: "80px"}} src={url} alt="profile" />);
                    })
                }
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    },[photo])

    return (
        <div>
            {avatar}
        </div>
    )
}

export default Avatar;