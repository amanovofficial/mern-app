import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from "../../store/actions/authActions";
import { Form, Container, Alert } from "react-bootstrap";
import { Redirect } from 'react-router';
import classes from "./Auth.module.css";
export function Login({ login, alert, isAuthenticated, user }) {

    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+998');

    const handleChangePhoneNumber = (e) => {
        const length = e.target.value.length
        if (length < 4 || length > 13) {
            return
        }
        setPhoneNumber(e.target.value)
    }

    const handleChangePassword = (e) => {
        // TODO: validate password
        setPassword(e.target.value)
    }

    const loginHandler = (e) => {
        e.preventDefault();
        const user = {
            phoneNumber,
            password
        }
        login(user)
    };

    const Login = (
        <Container className={classes.Container}>
            <h1 className={classes.header}>Вход</h1>
            { alert.text ? <Alert variant={alert.variant}>{alert.text}</Alert> : null}
            <Form onSubmit={loginHandler}>
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
                <button className={classes.button} type='submit'>Войти</button>
            </Form>
        </Container>
    )
    if (isAuthenticated && user.role === 'user') {
        return <Redirect to='/ads' />
    } else if (isAuthenticated && user.role === 'admin') {
        return <Redirect to='/admin' />
    } else {
        return Login
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    alert: state.alert
})

const mapDispatchToProps = (dispatch) => ({
    login: login(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)