import React, { useEffect, useState } from "react";
import Follower from "./Follower";
import Following from "./Following";
import SearchResult from "./SearchResult";

const Users = (props) => {
    const [page, setPage] = useState(<div></div>)
    const accounts = props.accounts;
    useEffect(() => {
        if (props.userType === "follower") {
            setPage(
                <div>
                    { accounts.map((account, index) => {
                        return(
                            <Follower key={index} update={props.update} account={account}/>
                        )
                    })}
                </div>
            )
        } else if (props.userType ==="following") {
            setPage(
                <div>
                    { accounts.map((account, index) => {
                        return(
                            <Following key={index} update={props.update} account={account}/>
                        )
                    })}
                </div>
            )
        } else if (props.userType ==="search") {
            setPage(
                <div>
                    { accounts.map((account, index) => {
                        return(
                            <SearchResult key={index} update={props.update} account={account}/>
                        )
                    })}
                </div>
            )
        } else {
            setPage(<div>Error...</div>)
        }
    },[props, accounts])
    return (
        <div>{page}</div>
    )
}

export default Users;