import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import UsersFilter from "../../../Components/Filter/UsersFilter";
import Pagination from "../../../Components/Pagination/Pagination";
import Loader from "../../../Components/Loader/Loader";
import IsLoaded from "../../../hoc/IsLoaded";
import IsAuthenticated from "../../../hoc/IsAuthenticated";
import ShowChildren from "../../../hoc/ShowChildren";
import getUsers from "../../../utils/users/getUsers";
import deleteUser from "../../../utils/users/deleteUser";
import UserCard from "../../../Components/UserCard/UserCard";
import classes from "./UsersPage.module.css";
import Alert from "../../../Components/Alert";
class UsersPage extends Component {

    state = {
        users: [],
        pageInfo: {},
        query: null,
        isLoading: true,
        isLoadingUsers: true,
        alert: {
            variant: '',
            text: ''
        }
    }

    componentDidMount() {
        getUsers.call(this)
    }

    render() {
        return (
            <IsAuthenticated userRoles={['admin']}>
                <IsLoaded isLoaded={!this.state.isLoading}>
                    <Container style={{ width: '70%' }}>
                        <Alert variant={this.state.alert.variant} text={this.state.alert.text} />
                        <UsersFilter search={getUsers.bind(this)} />
                        <ShowChildren condition={!this.props.isFilterChanged}>
                            {
                                !this.state.isLoadingUsers
                                    ? <>
                                        <p className={classes.totalDocs}>Всего ({this.state.pageInfo.totalDocs})</p>
                                        <div className='container'>
                                            <div className='row'>
                                                {
                                                    this.state.users.map((item, index) => (
                                                        <UserCard
                                                            key={index}
                                                            user={item}
                                                            token={this.props.token}
                                                            handleOnDelete={deleteUser.bind(this)}
                                                        />)
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <Pagination pageInfo={this.state.pageInfo} getAllElements={getUsers.bind(this)} />
                                    </>
                                    : <Loader />
                            }
                        </ShowChildren>
                    </Container>
                </IsLoaded>
            </IsAuthenticated>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token,
    query: state.filter.query,
    isFilterChanged: state.filter.changed
})

export default connect(mapStateToProps)(UsersPage)