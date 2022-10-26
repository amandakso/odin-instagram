import React, { useContext, useEffect, useState } from "react";
import { getFeed, auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "./Post";

const Feed = () => {
    const { currentUser } = useContext(AuthContext);
    const [feed, setFeed] = useState([]);

    const [user, loading, error] = useAuthState(auth);
    const [page, setPage] = useState(<div></div>) 
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            return;
        } else {
            (async () => {
                let info = await getFeed(currentUser.uid);
                info = info.sort(
                    (objA, objB) => Number(objB.timestamp) - Number(objA.timestamp),
                );
                setFeed(info);
            })(); 
        }
    },[currentUser]);

    useEffect(() => {
        if(loading) {
            setPage(<div>Loading...</div>);
        } else if (!currentUser) {
            setPage(<div></div>);
        } else if (user) {
            setPage(
                <div>
                    {feed.map((info, index) => {
                        return(
                            <Post key={index} info={info}/>
                        )
                    })}
                </div>
            );
        } else if (error) {
            setPage(<div>Error...</div>);
        } else {
            setPage(<div></div>);
            navigate("/logout");
            return;
        }
    }, [currentUser, feed, navigate, loading, user, error]);

    return (
        <div>
            {page}
        </div>
    )
}

export default Feed;