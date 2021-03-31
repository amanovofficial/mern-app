import React from "react";
import { Link } from "react-router-dom";
import IsAuthenticated from "../../../hoc/IsAuthenticated";
import classes from "./Main.module.css";
const Admin = () => {
    return (
        <IsAuthenticated userRoles={['admin']}>
            <div className={classes.main}>
                <h1 className={classes.header}>Панель администратора</h1>
                <div className={classes.container}>
                    <Link to='/admin/moderation-ads' className={classes.btnStandart}>Модерация объявлений</Link>
                    <Link to='/admin/users' className={classes.btnStandart}>Управление пользователями</Link>
                </div>
                <div className={classes.container}>
                    <Link to='admin/accaunt' className={classes.btnStandart}>Управление аккауном админа</Link>
                    <Link to='/logout' className={classes.btnStandart}>Выйти</Link>
                </div>
            </div>
        </IsAuthenticated>
    )
}

export default Admin