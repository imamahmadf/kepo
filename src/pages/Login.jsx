import React from "react";
import Logo from "../img/kepologo.png";
import { InputGroup, Form, Button } from "react-bootstrap";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../redux/actions/user";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    namaPengguna: "",
    kataSandi: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    if (this.props.userGlobal.id) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid dasar p-0 ">
        <div className="container ">
          <div className="row d-flex align-items-center pembungkus-daftar">
            <div className="col-lg-6 col-md-12 d-flex justify-content-center  ">
              <div className="tagline">
                <img src={Logo} alt="" className="logo" />
                <h1>Bagikan Keseharianmu</h1>
                <h6>untuk mereka yang hanya ingin tau</h6>
              </div>
            </div>

            <div className=" col-lg-6 col-md-12 ">
              <div className="row d-flex justify-content-center ">
                <div className="col-8 kotak-daftar shadow ">
                  <div>
                    {this.props.userGlobal.errMsg ? (
                      <div className="alert alert-danger">
                        {this.props.userGlobal.errMsg}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        name="namaPengguna"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        type="Password"
                        name="kataSandi"
                      />
                    </InputGroup>
                    <div className="d-grid gap-2 ">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => this.props.loginUser(this.state)}
                      >
                        Masuk
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center  align-items-center border-top border-2 mt-3">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/register"
                      >
                        {" "}
                        <Button variant="success" className="tombol-daftar ">
                          Daftar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid footer">
          <div className="container  text-center border-bottom border-2 p-3 d-flex bahasa">
            <p>Bahasa Indonesia</p>
            <p>Русский</p>
            <p>English (UK)</p>
            <p>日本語</p>
            <p>العربية </p>
            <p>한국어</p>
            <p>Bahasa Jawa</p>
            <p>Bahasa Sunda</p>
            <p>Bahasa Bugis</p>
            <p>Bahasa Medan</p>
            <p>Bahasa Banjar</p>
            <p>Bahasa Ambon</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
