import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const SingleImgCreator = (props) => {

    const [imgLink, setImgLink] = useState();

    useEffect(() => {
        let imageCode = (props.itemCode).substring(2, 9);
        setImgLink(`${props.link}${imageCode}_1.jpg`);
    }, [props]);



    return (
        <>
            {imgLink ?
                <img
                    src={imgLink}
                    alt="No Image"
                    width="100" height="100" />
                : "No Image"}
        </>
    );
};

export default SingleImgCreator;