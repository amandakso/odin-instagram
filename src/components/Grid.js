import React from "react";
import GridSquare from "./GridSquare";

const Grid = (props) => {
    const photos = props.photos;
    return (
        <div className="grid">
            { photos.map((photo,index) => {
                return(
                    <GridSquare key={index} photo={photo}/>
                )
            })
            }
        </div>
    )
}

export default Grid;