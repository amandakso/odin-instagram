import React, { useEffect, useState, useContext } from "react";
import { storage, getUsername, storeComment, getComments, getLikes, getLikeStatus, likePost, unlikePost } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import DefaultAvatar from "./DefaultAvatar";
import Comment from "./Comment";
import "../styles/Post.css";

const Post = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState("");
    const [postUser, setPostUser] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [viewHide, setViewHide] = useState("View");
    const [likeStatus, setLikeStatus] = useState();
    const [likes, setLikes] = useState([]);


    const displayComments = () => {
        let items = document.querySelectorAll(`.${props.info.post}`);
        console.log(items);
        items.forEach((item) => {
            switch(viewHide) {
                case "View":
                    item.style.display = "block";
                    break;
                case "Hide":
                    item.style.display = "none";
                    break;
                default:
                    item.style.display = "none";
            }
        })
        if (viewHide === "View") {
            setViewHide("Hide");
        } else {
            setViewHide("View");
        }
    }

    const addComment = async () => {
        try {
            await storeComment(props.info.owner, props.info.post, currentUser.uid, comment)
            setComment("");
            let comments = await getComments(props.info.post, props.info.owner);
            console.log(comments);
            setComments(comments);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                let status = await getLikeStatus(props.info.owner, props.info.post, currentUser.uid);
                setLikeStatus(status);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();

    },[props.info, currentUser]) 

    useEffect(() => {
        (async () => {
            try {
                let hearts = await getLikes(props.info.owner, props.info.post);
                setLikes(hearts);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    }, [props.info])

    useEffect(() => {
        (async () => {
                try {
                    await getDownloadURL(ref(storage, props.info.img))
                    .then((url) => {
                        setImage(url);
                    })
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();

    }, [props.info.img, image])

    useEffect(() => {
        (async () => {
            try {
                let allComments = await getComments(props.info.post, props.info.owner);
                setComments(allComments);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    }, [props.info.post, props.info.owner, comments])

    useEffect(() => {
        (async () => {
            try {
                let username = await getUsername(props.info.owner);
                setPostUser(username);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        })();
    }, [props.info.owner])

    const addLike = () => {
        if (likeStatus) {
            (async() => {
                try {
                    await unlikePost(props.info.owner, props.info.post, currentUser.uid);
                    let hearts = await getLikes(props.info.owner, props.info.post);
                    setLikes(hearts);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();
            setLikeStatus(false);
        } else {
            (async() => {
                try {
                    await likePost(props.info.owner, props.info.post, currentUser.uid);
                    let hearts = await getLikes(props.info.owner, props.info.post);
                    setLikes(hearts);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();
            setLikeStatus(true);
        }
    }

    return (
        <div className="post">
            <div className="postHeader">
                <DefaultAvatar className="postHeader-item" />
                <p className="postHeader-item"><Link className="text-link" to={`/users/${postUser}`}><strong>{postUser}</strong></Link></p>
            </div>
            <img className="postImage" src={image} alt=""/>
            <div className="postFooter">
                <div>
                    {
                        likeStatus === true
                        ? <span className="heart" style= {{color:'red'}} onClick={addLike} >&#9829;</span>
                        : <span className="heart" onClick={addLike} >&#9825;</span>
                    }
                    {
                        likes.length > 1 &&
                        <span>{likes.length} likes</span>
                    }
                    {
                        likes.length === 1 &&
                        <span>1 like</span>
                    }
                </div>
                <p className="caption"><Link className="text-link" to={`/users/${postUser}`}><strong>{postUser}</strong></Link><span> {props.info.caption}</span></p>
                
                {comments.map((comment, index) => {
                return(
                    <Comment key={index} info={comment}/>
                )
                })}
                {
                    comments.length > 1 && 
                    <p onClick={displayComments}>{viewHide} all {comments.length} comments</p>
                }
                {
                    comments.length === 1 && 
                    <p onClick={displayComments}>{viewHide} 1 comment</p>
                }       
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment..."
                />
                <button onClick={addComment}>Post</button>
            </div>
        </div>
    )
}
export default Post