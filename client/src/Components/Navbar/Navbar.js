import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import classes from "./Navbar.module.css";
const NavBar = ({ isAuthenticated, user, logout }) => {

    const classList = [classes.ref]
    const userNavItems = <React.Fragment>
        <Link className={classList.join(' ')} to="/my-ads"> Мои объявления </Link>
        <Link className={classList.join(' ')} to="/create-ad"> Разместить объявление </Link>
    </React.Fragment>
    const adminNavItems = <React.Fragment>
        <Link className={classList.join(' ')} to="/admin"> Панель администратора </Link>
    </React.Fragment>

    return (
        <React.Fragment>
            <Navbar
                style={{ backgroundColor: '#29ab93' }}
                collapseOnSelect expand="lg" >
                <Container>
                    {/* <Navbar.Brand className={classes.navbarBrand}> Yourhome </Navbar.Brand> */}
                    <Link className={classList.join(' ')} to="/"> ТВОЙ ДОМ</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link className={classList.join(' ')} to="/ads">Объявления</Link>
                            {isAuthenticated && user.role === 'admin' ? adminNavItems : userNavItems}
                        </Nav>
                        <Nav>
                            {!isAuthenticated
                                ? <React.Fragment>
                                    <Link className={classes.auth} to="/login"> Вход</Link>
                                    <Link className={classes.auth} to="/register"> Регистрация</Link>
                                </React.Fragment>
                                : <NavDropdown title={user.name} className={classList.join(' ')} id="basic-nav-dropdown">
                                    <NavDropdown.Item href='#'>Управление аккаунтом</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>
                                        <Link className={classes.logoutRef} to="/logout"> Выйти</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment >
    )
}

const setStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    logout: logout(dispatch)
})

export default connect(setStateToProps, mapDispatchToProps)(NavBar)