import classes from "./ErrorPage.module.css";
import React from "react";
const ErrorPage = ({ text, notFound }) => {
    return (
        notFound
            ? <div className={classes.container}>
                <p className={classes.errorHeader}>Ошибка</p>
                <p className={classes.errorHeader}>404</p>
                <p className={classes.errorMessageDescription}>Страница не найдена!</p>
            </div>
            : <div className={classes.container}>
                <p className={classes.errorHeader}>Ooops!</p>
                <p className={classes.errorMessageDescription}>{text ? text : 'Что то пошло не так('}</p>
            </div>
    )
}

export default ErrorPage