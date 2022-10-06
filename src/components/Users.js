import React from "react";
import User from "./User";

const Users = (props) => {
    const followers = props.followers;
    return (
        <div>
        { followers.map((follower, index) => {
                return(
                    <User key={index} update={props.update} follower={follower}/>
                )
        })};
        </div>
    )
}

export default Users;