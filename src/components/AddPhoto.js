import React, { useState } from 'react';
import Navbar from './Navbar';
import ImageCropper from './ImageCropper';
import UploadPost from './UploadPost';

const AddPhoto = () => {
    const [photo, setPhoto] = useState(null);

    const updatePhoto = (newPhoto) => {
        setPhoto(newPhoto);
    }

    return (
        <div>
            <Navbar />
            {photo != null
                ? <UploadPost photo={photo}/>
                : <ImageCropper updatePhoto={updatePhoto} />
            }
        </div>
    )
}

export default AddPhoto;