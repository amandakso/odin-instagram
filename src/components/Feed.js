import React, { useContext, useEffect, useState } from "react";
import { getFeed } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
import Post from "./Post";

const Feed = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        (async () => {
            let info = await getFeed(currentUser.uid);
            info = info.sort(
                (objA, objB) => Number(objB.timestamp) - Number(objA.timestamp),
            );
            setFeed(info);
        })(); 
    },[currentUser])

    return (
        <div>
            {feed.map((info, index) => {
                return(
                    <Post key={index} info={info}/>
                )
            })}
        </div>
    )
}

export default Feed;