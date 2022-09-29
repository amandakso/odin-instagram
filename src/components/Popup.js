import React from "react";
import close from "../assets/close-circle.png";

const Popup = (props) => {
    return (
        <div>
            <img className="close"onClick={props.onClick} src={close} alt="close"/>
            {props.info}
        </div>
    )
}

export default Popup;