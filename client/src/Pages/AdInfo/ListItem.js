import React from "react";
import classes from "./AdInfo.module.css";
const ListItem = function (props) {
    return (
        <li className={classes.ListItem}>
            <span className={classes.itemName} >{props.itemName}</span>
            <span className={classes.itemValue} >{props.itemValue}</span>
        </li>
    )
}

export default ListItem