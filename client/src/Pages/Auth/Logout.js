import React from 'react';
import { connect } from 'react-redux';
import { logout } from "../../store/actions/authActions";
import { Redirect } from 'react-router';
export function Logout({ logout }) {
        logout()
        return <Redirect to='/login' />
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
    logout: logout(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Logout)