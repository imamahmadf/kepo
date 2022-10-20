import React from "react";
import Logo from "../img/kepologo.png";
import axios from "axios";
import { API_URL } from "../Constant/API";

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading...",
    };
  }

  componentDidMount() {
    axios
      .patch(
        API_URL + `/kepo/verified`,
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
      <div className="container p-5">
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default VerificationPage;
