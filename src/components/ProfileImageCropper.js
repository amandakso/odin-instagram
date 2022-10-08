import React, { useState, useRef, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { updateProfilePhoto } from '../firebase/firebase.config';
import getCroppedImg from './GetCroppedImg';
import "../styles/ImageCropper.css";

const ProfileImageCropper = (props) => {
    const inputRef = useRef();
    const triggerFileSelectPopup = () => inputRef.current.click();

    const [image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
 

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };
    useEffect (() => {
        if (croppedImage) {
            const updatePhoto = (newPhoto) => props.updatePhoto(newPhoto);
            updatePhoto(croppedImage);
            setImage(null);
        }
    }, [props, croppedImage])

    const storeCroppedImage = useCallback(async () => {
        if (image) {
            try {
                const croppedImage = await getCroppedImg(
                    image,
                    croppedArea,
                )
                setCroppedImage(croppedImage);
                await updateProfilePhoto(props.user.uid, croppedImage);
            } catch (e) {
                console.error(e)
            }
        } else {
            return;
        }
    }, [croppedArea, image, props.user])
    
    
    return (
        <div className="profile-container">
            <div className="container-cropper">
                {image ? (
                    <div>
                        <div className="cropper">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="slider">
                            <input
                                type="range"
                                min="1"
                                max="3" 
                                step="0.1"
                                value={zoom}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="container-buttons profile-btn">
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={onSelectFile}
                    style={{ display: "none" }}
                />
                <button
                    onClick={triggerFileSelectPopup}
                >
                    Upload 
                </button>
                <button
                    onClick={storeCroppedImage}
                >
                    Save Photo
                </button>
            </div>
        </div>
    )
}

export default ProfileImageCropper;