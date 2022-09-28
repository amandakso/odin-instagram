import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase.config";

const GridSquare = (props) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        (async () => {
                try {
                    await getDownloadURL(ref(storage, props.photo.img))
                    .then((url) => {
                        setImage(url);
                    })
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();

    }, [props.photo.img, image])
    console.log(props);
    return (
        <div>
            <img className="gridSquare" src={image} alt=""/>
        </div>
    )
}

export default GridSquare;