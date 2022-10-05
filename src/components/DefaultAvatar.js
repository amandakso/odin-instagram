import React from "react";
import avatar from "../assets/pandaAvatar.png";
import "../styles/Avatar.css";

export default function DefaultAvatar() {
    return <img className="avatar" src={avatar} alt="default panda avatar" />
}