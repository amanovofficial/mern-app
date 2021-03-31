import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import Registration from "./Pages/Auth/Registration";
import Ads from "./Pages/Ads";
import AdInfo from "./Pages/AdInfo/AdInfo";
import MyAds from "./Pages/MyAds";
import AdCreatePage from "./Pages/AdCreatePage/AdCreatePage";
import AdEditPage from "./Pages/AdEditPage/AdEditPage";
import AdminLogin from "./Pages/Admin/Login/Login";
import AdminRegistration from "./Pages/Admin/Registration/Registration";
import AdminMain from "./Pages/Admin/Main/Main";
import AdminModeration from "./Pages/Admin/Moderation/Moderation";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import UsersPage from "./Pages/Admin/Users/UsersPage";

class App extends Component {
  componentDidMount() {
    this.props.loadUserOnReloadPage(this.props.token)
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Redirect exact path='/' to='/ads' />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/ads" component={Ads} />
          <Route exact path="/ads/:id" component={AdInfo} />

          {/* users private routs */}
          <Route exact path="/my-ads" component={MyAds} />
          <Route exact path="/create-ad" component={AdCreatePage} />
          <Route exact path="/edit-ad/:id" component={AdEditPage} />

          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/register" component={AdminRegistration} />

          {/* admins private routs */}
          <Route exact path="/admin" component={AdminMain} />
          <Route exact path="/admin/moderation-ads" component={AdminModeration} />
          <Route exact path="/admin/users" component={UsersPage} />
          <Route exact path="/*" render={() => (<ErrorPage notFound={true} />)} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
  loadUserOnReloadPage: loadUser(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
