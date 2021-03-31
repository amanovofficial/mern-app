import React from "react";
const ShowChildren = ({ condition, children }) => {
    return condition ? children : null
}

export default ShowChildren