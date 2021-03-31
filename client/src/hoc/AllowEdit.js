import React from "react";
import { connect } from "react-redux";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
// Данный компонент проверяет права доступа пользователя на редактирование
const AllowEdit = ({ user, adUserID, children }) => {
    // если id текущего пользователя и id пользователя, который, создал данное объявление совпадает
    // или пользователь имеет роль администратора
    // данный компонент вернет дочерный компонент(children)
    // иначе вернет страницу ошибки с текстом "Вы не имеете право на редактирования!"

    const allowEdit = user.id === adUserID || user.role === 'admin'
    return allowEdit ? children : <ErrorPage text='Вы не имеете право на редактирования!' />
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(AllowEdit)
