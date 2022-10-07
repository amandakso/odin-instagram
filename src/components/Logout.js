import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/panda-insta.png"

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(()=>{
            navigate("/");
        }, 500);
    }, [navigate]);

    return (
        <div>
            <img src={logo} style={{width: "250px"}}alt="Pandastagram logo"/>
            <h2>Logged Out! Redirecting now... </h2>
        </div>
    )
}

export default Logout;