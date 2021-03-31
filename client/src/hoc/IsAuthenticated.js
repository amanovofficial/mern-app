import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import IsLoaded from "./IsLoaded";
class IsAuthenticated extends Component {
    state = {
        isLoading: true
    }
    componentDidMount() {
        // сделаем задержку на 500 мс чтобы данные аутентификации успели подгружаться с сервера
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 500);
    }
    render() {
        const { isAuthenticated, user, userRoles, children } = this.props
        return (
            <IsLoaded isLoaded={!this.state.isLoading} >
                {
                    isAuthenticated && userRoles.includes(user.role)
                        ? children
                        : <Redirect to='/login' />
                }
            </IsLoaded>
        )
    }

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(IsAuthenticated)