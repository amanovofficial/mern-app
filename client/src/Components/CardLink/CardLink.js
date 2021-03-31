import React from "react";
import classes from "./CardLink.module.css";
const CardLink = function (props) {
    return (
        <a className={classes.ref} href={props.link}>
            { props.children}
        </a>
    )
}

export default CardLink