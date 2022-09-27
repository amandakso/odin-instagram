import React, { useEffect, useState, useContext } from "react";
import { storage, getUsername, storeComment, getComments, getLikeStatus, likePost, unlikePost } from "../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
import { ref, getDownloadURL } from "firebase/storage";
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
    console.log(likeStatus);

    const displayComments = () => {
        let items = document.querySelectorAll(`.${props.info.post}`);
        items.forEach((item) => {
            switch(item.style.display) {
                case "none":
                    item.style.display = "block";
                    setViewHide("Hide")
                    break;
                case "block":
                    item.style.display = "none";
                    setViewHide("View")
                    break;
                default:
                    item.style.display = "none";
                    setViewHide("View")
            }
        })
    }

    const addComment = async () => {
        try {
            await storeComment(props.info.owner, props.info.post, currentUser.uid, comment)
            setComment("");
            let comments = await getComments(props.info.post, props.info.owner);
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
                     let comments = await getComments(props.info.post, props.info.owner);
                     setComments(comments);
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
                    unlikePost(props.info.owner, props.info.post, currentUser.uid);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            })();
            setLikeStatus(false);
        } else {
            (async() => {
                try {
                    likePost(props.info.owner, props.info.post, currentUser.uid);
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
                <p className="postHeader-item"><strong>{postUser}</strong></p>
            </div>
            <img className="postImage" src={image} alt=""/>
            <div className="postFooter">
                {
                    likeStatus === true
                    ? <p className="heart" style= {{color:'red'}} onClick={addLike} >&#9829;</p>
                    : <p className="heart" onClick={addLike} >&#9825;</p>
                }
                <p className="caption"><strong>{postUser}</strong><span> {props.info.caption}</span></p>
                
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