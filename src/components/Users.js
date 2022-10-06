import React from "react";
import Follower from "./Follower";

const Users = (props) => {
    const accounts = props.accounts;
    return (
        <div>
        { accounts.map((account, index) => {
                return(
                    <Follower key={index} update={props.update} account={account}/>
                )
        })};
        </div>
    )
}

export default Users;