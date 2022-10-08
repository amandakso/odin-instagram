import React, { useEffect, useState, useContext } from "react";
import { storage, getUsername, storeComment, getComments, getLikes, getLikeStatus, likePost, unlikePost } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Comments from "./Comments";
import Comment from "./Comment";
import deleteIcon from "../assets/close-thick.png";
import "../styles/Post.css";

const Post = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState("");
    const [postUser, setPostUser] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [viewHide, setViewHide] = useState("View");
    const [isClicked, setIsClicked] = useState(false);
    const [likeStatus, setLikeStatus] = useState();
    const [likes, setLikes] = useState([]);
    const [deleteOption, setDeleteOption] = useState(false);

    const displayComments = () => {
        if (!isClicked) {
            setViewHide("Hide");
            setIsClicked(true);
        } else {
            setViewHide("View");
            setIsClicked(false);
        }
    };

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
    };

    useEffect(() => {
        if (!currentUser) {
            return;
        } else if (currentUser.uid === props.info.owner) {
            setDeleteOption(true);
        } else {
            return;
        }
    },[currentUser, props.info])

    useEffect(() => {
        if (!currentUser) {
            return
        } else {
            (async () => {
                try {
                    let status = await getLikeStatus(props.info.owner, props.info.post, currentUser.uid);
                    setLikeStatus(status);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();
        }

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

    }, [props.info.img])

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
    }, [props.info.post, props.info.owner])

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
                <Avatar user={props.info.owner} className="postHeader-item"/>
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
                    { deleteOption
                        ? <span className="delete"><img src={deleteIcon} alt="delete"/></span>
                        : null
                    }
                </div>
                <p className="caption"><Link className="text-link" to={`/users/${postUser}`}><strong>{postUser}</strong></Link><span> {props.info.caption}</span></p>
                <div className="comments">
                    { isClicked
                        ? <Comments comments={comments}/>
                        :null
                    }             
                </div>
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