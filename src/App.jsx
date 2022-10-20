import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Register2 from "./pages/Register2";
import Content from "./pages/Content";
import Profile from "./pages/Profile";
import Navbar from "./component/Navbar";

import VerificationPage from "./pages/verification";
import { connect } from "react-redux";
import { UserKeepLogin, checkStorage } from "./redux/actions/user";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataKepo");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      // console.log(userData)

      this.props.UserKeepLogin(userData);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <div className="dark-mode">
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route
                component={VerificationPage}
                path="/authentication/:token"
              />
              <Route component={Login} path="/login" />
              <Route component={Register} path="/register" />
              <Route component={Register2} path="/register2" />
              <Route component={Content} path="/content/:postId" />
              <Route component={Profile} path="/profile/:username" />
              <Route component={Home} path="/" />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
    return <div>Loading......</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  UserKeepLogin,
  checkStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
