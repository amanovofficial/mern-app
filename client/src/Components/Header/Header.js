import React from "react";
import classes from "./Header.module.css"

const header = (props)=>{
    return(
        <h5 className={classes.Header}>{props.children}</h5>
    )
}

export default header