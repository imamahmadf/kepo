import React from "react";
import Logo from "../img/kepologo.png";
import axios from "axios";
import { API_URL } from "../Constant/API";

class Auth extends React.Component {
  state = {
    message: "Loading...",
  };

  componentDidMount() {
    axios
      .patch(
        `${API_URL}/kepo/verified`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.props.match.params.token}`,
          },
        }
      )
      .then((res) => {
        this.setState({ message: "Your Account Verified ✔" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container bg-dark">
        <h1>selamat datang</h1>
        <img src={Logo} alt="" className="logo" />
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default Auth;
