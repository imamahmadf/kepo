import { Container, Navbar, Modal, Button, Row } from "react-bootstrap";
import Logo from "../img/kepologo.png";
import Keluar from "../img/icon/keluar.png";
import Beranda from "../img/icon/beranda.png";
import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { LogoutUser } from "../redux/actions/user";
import "./navbar.css";
import Cari from "../img/icon/cari.png";
import Notifikasi from "../img/icon/notifikasi.png";
import Post from "../img/icon/post.png";
import KepoLogoPutih from "../img/logo/KepoLogoPutih.png";
import Lokasi from "../img/icon/lokasi.png";
import Foto from "../img/icon/foto.png";
import Axios from "axios";
import { API_URL } from "../Constant/API";
import Swal from "sweetalert2";

class navbarScroll extends React.Component {
  state = {
    show: false,
    postKeterangan: "",
    postFoto: "",
    postLokasi: "",
    postSuka: 0,
    postKomentar: [],
    postUserId: 1,
  };

  addPost = () => {
    Axios.post(`${API_URL}/post`, {
      foto: this.state.postFoto,
      lokasi: this.state.postLokasi,
      keterangan: this.state.postKeterangan,
      suka: this.state.postSuka,
      komentar: this.state.postKomentar,
      namaPengguna: this.props.userGlobal.namaPengguna,
      fotoProfil: this.props.userGlobal.fotoProfil,
    })
      .then((result) => {
        Swal.fire("Good job!", "You clicked the button!", "success");

        this.setState({
          postKeterangan: "",
          postFoto: "",
          postLokasi: "",
          postSuka: 0,
          postKomentar: [],
          postUserId: 1,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  postToggle = (val) => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <Navbar
        style={{ backgroundColor: "white" }}
        expand="lg"
        className="bayangan fixed-top"
      >
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-between"
          >
            <div>
              <Link to="/">
                <img
                  src={Logo}
                  height="50"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Link>
            </div>
            {this.props.userGlobal.nama ? (
              <>
                <div className="cari">
                  <span>
                    <img src={Cari} alt="" srcset="" />
                  </span>
                  <input type="text" placeholder="Cari" />
                </div>
                <div className="d-flex flex-row align-items-center ">
                  <div>
                    <Link to="/">
                      <img
                        src={Beranda}
                        height="20"
                        className="px-4"
                        alt="foto profile"
                      />
                    </Link>
                    <img
                      onClick={() => this.postToggle(this.state.show)}
                      src={Post}
                      height="20"
                      className="px-4"
                      alt="foto profile"
                    />
                    <img
                      src={Notifikasi}
                      height="20"
                      className="px-4"
                      alt="foto profile"
                    />
                    <Link onClick={this.props.LogoutUser} to="/login">
                      <img
                        src={Keluar}
                        height="20"
                        className="px-4"
                        alt="foto profile"
                      />
                    </Link>
                  </div>
                  <div>
                    <h6 className="mx-2">
                      Hai, {this.props.userGlobal.namaPengguna}
                    </h6>
                  </div>
                  <div className="profile-navbar rounded-circle my-auto">
                    <Link to="/profile">
                      <img
                        src={this.props.userGlobal.fotoProfil}
                        alt="foto profile"
                      />
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </Navbar.Collapse>
        </Container>
        <Row>
          <Modal
            show={this.state.show}
            onHide={() => this.setState({ show: !this.state.show })}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">tess</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="kolom-post bayangan ">
                  <div className="kolom-post-logo">
                    <img src={KepoLogoPutih} alt="" />
                  </div>
                  <div className="kolom-post-caption">
                    <textarea
                      onChange={this.inputHandler}
                      value={this.state.postKeterangan}
                      name="postKeterangan"
                      type="text"
                      placeholder="Sebarkan aibmu..."
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="lokasi-home">
                    <span>
                      <img src={Lokasi} alt="" srcset="" />
                    </span>
                    <input
                      onChange={this.inputHandler}
                      value={this.state.postLokasi}
                      name="postLokasi"
                      type="text"
                      placeholder="Lokasi ..."
                    />
                  </div>
                  <div className="posting-foto d-flex justify-content-between">
                    <div>
                      <img src={Foto} alt="" />
                      <input
                        onChange={this.inputHandler}
                        value={this.state.postFoto}
                        name="postFoto"
                        type="text"
                        placeholder="Lokasi ..."
                      />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => this.setState({ show: !this.state.show })}
                variant="secondary"
              >
                Close
              </Button>
              <div onClick={() => this.setState({ show: !this.state.show })}>
                <Link to="/profile">
                  <Button
                    onClick={() => this.addPost(this.state)}
                    variant="primary"
                  >
                    Save
                  </Button>
                </Link>
              </div>
            </Modal.Footer>
          </Modal>
        </Row>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  LogoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(navbarScroll);
