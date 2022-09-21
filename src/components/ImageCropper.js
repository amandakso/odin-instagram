import React, { useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from './GetCroppedImg';
import "../styles/ImageCropper.css";

const ImageCropper = () => {
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
    const storeCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedArea,
            )
            console.log('done', { croppedImage })
            setCroppedImage(croppedImage)
            console.log(croppedImage);
        } catch (e) {
            console.error(e)
        }
    }, [image, croppedArea])


    return (
        <div className="container">
            <div className="container-cropper">
                {image ? (
                    <div>
                        <div className="cropper">
                            <Cropper 
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
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
            <div className="container-buttons">
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
                    Choose 
                </button>
                <button
                    onClick={storeCroppedImage}
                >
                    Download
                </button>
            </div>
        </div>
    )
}

export default ImageCropper;
