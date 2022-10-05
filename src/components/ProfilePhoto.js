import React, { useState, useEffect }from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import DefaultAvatar from "./DefaultAvatar";
import ProfileImageCropper from "./ProfileImageCropper";

const ProfilePhoto = (props) => {
    const [photo, setPhoto] = useState(null);
    const updatePhoto = (newPhoto) => {
        setPhoto(newPhoto);
    }

    useEffect(() => {
        (async () => {
            try {
                if (!props.user.photoURL) {
                    return;
                } else {
                    await getDownloadURL(ref(storage, props.user.photoURL))
                    .then((url) => {
                        setPhoto(url);
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
            {photo
                ? <img src={photo} alt="profile" style={{borderRadius: "50%", width: "250px"}}/>
                : <DefaultAvatar style={{width: "250px"}}/>
            }
                <ProfileImageCropper user={props.user} updatePhoto={updatePhoto}/>
        </div>
    )
}

export default ProfilePhoto;