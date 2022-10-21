import React from "react";
import Logo from "../img/kepologo.png";
import axios from "axios";
import { API_URL } from "../Constant/API";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
      <div className="container-fluid text-center">
        <div style={{ height: "200px" }}></div>
        <h1>akun anda sudah terverifikasi</h1>
        <Link style={{ textDecoration: "none", color: "white" }} to="/login">
          <Button variant="success" className="tombol-daftar ">
            Masuk
          </Button>
        </Link>
      </div>
    );
  }
}

export default VerificationPage;
