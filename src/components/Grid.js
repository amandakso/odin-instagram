import React from "react";
import GridSquare from "./GridSquare";

const Grid = (props) => {
    const photos = props.photos;
    let sortedPhotos = photos.sort(
        (a,b) => b.timestamp.seconds - a.timestamp.seconds,
    );

    return (
        <div className="grid">
            { sortedPhotos.map((photo,index) => {
                return(
                    <GridSquare key={index} photo={photo}/>
                )
            })
            }
        </div>
    )
}

export default Grid;