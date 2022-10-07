import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import Post from "./Post";
import Popup from "./Popup";

const GridSquare = (props) => {
    const [image, setImage] = useState("");
    const [popup, setPopup] = useState();
    const [isClicked, setIsClicked] = useState(false);

    const clickImage = () => {
        if (!isClicked) {
            setPopup(<Post info={props.photo}/>);
            setIsClicked(true);
        } else {
            setPopup("");
            setIsClicked(false);
        }
    }

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

    }, [props.photo.img])
    return (
        <div>
            <img className="gridSquare" onClick={clickImage} src={image} alt=""/>
            { isClicked
                ? <div className="popup"><Popup info={popup} onClick={clickImage}/></div>
                : null
            }
            
        </div>
    )
}

export default GridSquare;