import React, { Component } from "react";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import classes from "./Loader.module.css";
class Loader extends Component {

    state = {
        isLoading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 5000);
    }

    render() {
        return (
            this.state.isLoading
                ? <div className={classes.center} >
                    <div className={classes.Loader}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                : <ErrorPage />
        )
    }
}

export default Loader