import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ImageCropper from './ImageCropper';

const AddPost = () => {
    return (
        <div>
            <Navbar />
            <ImageCropper />
        </div>
    )
}

export default AddPost;





/*
export default function UploadImages() {
    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        
        const newImageUrls = [];
        images.forEach(image=> newImageUrls.push(URL.createObjectURL(image)));
        
        setImagesURLs([URL.createObjectURL(images[0])]);
    }, [images])

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={onImageChange} />
            { <img src={imagesURLs[0]} alt="" /> }
        </div>
    )
}
*/