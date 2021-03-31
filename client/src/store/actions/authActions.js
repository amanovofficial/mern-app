import axios from "axios";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SUCCESS, //ALERT
    ERROR //ALERT
} from "./actionTypes";

import { setAlert, clearAlert } from "./alertActions";
//Данная фукция отправляет запрос к серверу с токеном
//  если токен валидный, сервер возвращает данные пользователя
export const loadUser = (dispatch) => (token) => {
    if (!token) {
        // если токен отсутствует функция завершит свое выполнение
        return
    }
    dispatch({ type: USER_LOADING })

    const config = getRequestHeaders(token)

    axios
        .get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = (dispatch) => ({ role, name, password, phoneNumber }) => {

    const config = getRequestHeaders()
    const body = JSON.stringify({ role, name, password, phoneNumber })

    axios
        .post('/api/auth/register', body, config)
        .then(({ data }) => {
            dispatch(setAlert(SUCCESS, 'Регистрация прошла успешно'))
            setTimeout(() => {
                dispatch(clearAlert())
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: data
                })
            }, 1000);
        })
        .catch(err => {
            dispatch({ type: REGISTER_FAIL })
            let errorMsg = err.response ? err.response.data.message : err.message
            dispatch(setAlert(ERROR, errorMsg))
            setTimeout(() => {
                dispatch(clearAlert())
            }, 1000);
        })
}

export const login = (dispatch) => ({ phoneNumber, password }) => {

    const config = getRequestHeaders()
    const body = JSON.stringify({ phoneNumber, password })

    axios
        .post('/api/auth/login', body, config)
        .then(res => {
            dispatch(setAlert(SUCCESS, 'Вы успешно вошли в систему'))
            setTimeout(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                dispatch(clearAlert())
            }, 1000);
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL })
            let errorMsg = err.response ? err.response.data.message : err.message
            dispatch(setAlert(ERROR, errorMsg))
            setTimeout(() => {
                dispatch(clearAlert())
            }, 1000);
        })
}

export const logout = (dispatch) => () => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const getRequestHeaders = (token = null) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}