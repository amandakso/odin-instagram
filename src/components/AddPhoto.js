import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import Navbar from './Navbar';
import Error from "./Error";
import ImageCropper from './ImageCropper';
import UploadPost from './UploadPost';

const AddPhoto = () => {
    const [photo, setPhoto] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const [page, setPage] = useState(<div></div>) 
    const navigate = useNavigate();

    const updatePhoto = (newPhoto) => {
        setPhoto(newPhoto);
    }

    useEffect(() => {
        if(loading) {
            setPage(<div>Loading...</div>)
        } else if (user) {
            setPage(        
                <div>
                    <Navbar />
                    {photo != null
                        ? <UploadPost photo={photo}/>
                        : <ImageCropper updatePhoto={updatePhoto} />
                    }
                </div>)
        } else if (error) {
            setPage(<div><Error /></div>)
        } else {
            navigate("/logout");
            return;
        }
    }, [ photo, navigate, loading, user, error]);

    return (
        <div>
            {page}
        </div>
    )
}

export default AddPhoto;