import React, { useState } from 'react';
import { Form, Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { register } from '../../store/actions/authActions';
import classes from "./Auth.module.css";
import { Redirect } from 'react-router';

export function Registration({ role = 'user', register, alert, isAuthenticated, user }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+998');

    const handleChangeName = (e) => {
        // TODO: validate name
        setName(e.target.value)
    }

    const handleChangePhoneNumber = (e) => {
        const length = e.target.value.length
        if (length < 4 || length > 13) {
            return
        }
        setPhoneNumber(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const registerHandler = (e) => {
        e.preventDefault();
        register({ role, name, phoneNumber, password })
    };

    const Register = (
        <Container className={classes.Container}>
            <h1 className={classes.header}>Регистрация</h1>
            { alert.text ? <Alert variant={alert.variant}>{alert.text}</Alert> : null}
            <Form onSubmit={registerHandler}>
                <Form.Control
                    type="text"
                    placeholder="Введите имя"
                    className={classes.FormControl}
                    value={name}
                    onChange={handleChangeName} />

                <Form.Control
                    type="text"
                    placeholder="Введите номер телефона"
                    className={classes.FormControl}
                    value={phoneNumber}
                    onChange={handleChangePhoneNumber} />

                <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    className={classes.FormControl}
                    value={password}
                    onChange={handleChangePassword}
                />
                <button className={classes.button} type='submit'>Зарегистрироваться</button>
            </Form>
        </Container>
    )
    if (isAuthenticated && user.role === 'user') {
        return <Redirect to='/ads' />
    } else if (isAuthenticated && user.role === 'admin') {
        return <Redirect to='/admin' />
    } else {
        return Register
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    alert: state.alert
})

const mapDispatchToProps = (dispatch) => ({
    register: register(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Registration)

    