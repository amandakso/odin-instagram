import React, { useContext, useEffect, useState } from "react";
import { getFeed } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";

const Feed = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        (async () => {
            let info = await getFeed(currentUser.uid);
            info = info.sort(
                (objA, objB) => Number(objB.timestamp) - Number(objA.timestamp),
            );
            console.log(info);
            setFeed(info);
        })();
/*

    */
       
    },[currentUser])
    return (
        <div>
        </div>
    )
}

export default Feed;