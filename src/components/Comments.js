import React from "react";
import Comment from "./Comment";

const Comments = (props) => {
    const comments = props.comments;
    
    let sortedComments = comments.sort(
        (a,b) => b.timestamp.seconds - a.timestamp.seconds,
    );

    return (
        <div>
            {
            sortedComments.map((comment, index) => {
                return(
                    <Comment key={index} info={comment} />
                )
                })
            }
        </div>
    )
};

export default Comments;