import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "./AuthProvider";
import { savePost } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPost.css";

const UploadPost = (props) => {
    const { currentUser } = useContext(AuthContext)
    const photo = props.photo;
    const [caption, setCaption] = useState("");
    const navigate = useNavigate();

    const uploadPost = async (currentUser, photo, caption) => {
        try {
           const answer = await savePost(currentUser.uid, photo, caption);
           if (answer) {
                navigate("/dashboard");
           }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }
    return (
        <div className="container">
            <img id="photo" src={photo} alt=""></img>
            <div className="caption-container">
                <textarea 
                    className="caption"
                    rows={8}
                    cols={50}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add caption..."
                />
                <button onClick={() => uploadPost(currentUser, photo, caption)}>
                    Upload Post
                </button>

            </div>
        </div>
    )
}

export default UploadPost;