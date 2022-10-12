import React from "react";
import Comment from "./Comment";

const Comments = (props) => {
    const comments = props.comments;
    return (
        <div>
            {
            comments.map((comment, index) => {
                return(
                    <Comment key={index} info={comment} user={props.user}/>
                )
                })
            }
        </div>
    )
};
export default Comments;