import React from "react";
import Loader from "../Components/Loader/Loader";
const IsLoaded = ({ isLoaded, children }) => {
        return isLoaded  ? children : <Loader />
}

export default IsLoaded