import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { getRequestHeaders } from "../../store/actions/authActions"
import classes from "./UserCard.module.css";

const UserCard = (props) => {
    let { _id, name, phoneNumber, role } = props.user
    const { handleOnDelete, token } = props
    const [isBlocked, setIsBlocked] = useState(props.user.isBlocked)

    const handleOnBlockingOrUnlocking = () => {
        const url = `/api/users/changeAccess/${_id}`
        const config = getRequestHeaders(token)
        const body = { isBlocked: !isBlocked }
        axios
            .put(url, body, config)
            .then(res => {
                const user = res.data.user
                setIsBlocked(user.isBlocked)
            }).catch(err => {
                console.log(err);
            })
    }

    let blocked = (
        <span className={classes.unpublished}>(Блокирован)</span>
    )
    return (
        <div className={'col-sm-6 ' + classes.card}>
            <div className={classes.marginBlock}>
                <Card.Header>
                    <><strong>Имя: </strong>{name}  {isBlocked ? blocked : null}</>
                </Card.Header>
                <Card.Body>
                    <><strong>ID: </strong>{_id}</>
                    <br />
                    <><strong>Номер телефона: </strong>{phoneNumber}</>
                    <br />
                    <><strong>Роль: </strong>{role}</>
                </Card.Body>
                <div>
                    {
                        isBlocked
                            ? <button data-id={_id} onClick={handleOnBlockingOrUnlocking} className={classes.unblocking}>Разблокировать</button>
                            : <button data-id={_id} onClick={handleOnBlockingOrUnlocking} className={classes.blocking}>Блокировать</button>
                    }
                    <button data-id={_id} onClick={handleOnDelete} className={classes.deleteButton}>
                        Удалить
                </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard