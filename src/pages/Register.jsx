import React from "react";
import Logo from "../img/kepologo.png";
import { InputGroup, Form, Button } from "react-bootstrap";
// import './Login.css'

import { registerUser } from "../redux/actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    nama: "",
    namaPengguna: "",
    email: "",
    fotoProfil:
      "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg",
    kataSandi: "",
    bio: "Tambahkan Biografimu",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
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

            <div className=" col-lg-6 col-md-12 pt-3 ">
              <div className="row d-flex justify-content-center ">
                <div className="col-8 kotak-daftar shadow ">
                  <div>
                    <h5>Daftar</h5>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Nama"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        name="nama"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Nama Pengguna"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        name="namaPengguna"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        name="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Kata Sandi"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        name="kataSandi"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Ulangi Kata Sandi"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        onChange={this.inputHandler}
                        name="kataSandiUlang"
                      />
                    </InputGroup>
                    <div className="d-grid gap-2 ">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => this.props.registerUser(this.state)}
                      >
                        Daftar
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center  align-items-center border-top border-2 mt-3">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/login"
                      >
                        {" "}
                        <Button variant="success" className="tombol-daftar ">
                          Masuk
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

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
