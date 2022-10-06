import React from "react";
import close from "../assets/close-circle.png";
import Users from "./Users";
import "../styles/Users.css";

const UsersModal = (props) => {
    return (
        <div className="modal">
            <img className="close" onClick={props.onClick} src={close} alt="close"/>
            <Users followers={props.followers} update={props.update}/>
        </div>

    )

}

export default UsersModal;