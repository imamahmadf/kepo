import { Container, Navbar, Modal, Button, Row } from "react-bootstrap";
import Logo from "../img/kepologo.png";
import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { LogoutUser } from "../redux/actions/user";
import "./navbar.css";
import Cari from "../img/icon/cari.png";
import KepoLogoPutih from "../img/logo/KepoLogoPutih.png";
import Lokasi from "../img/icon/lokasi.png";
import Foto from "../img/default-profile.jpg";
import Axios from "axios";
import { API_URL } from "../Constant/API";
import Swal from "sweetalert2";

class navbarScroll extends React.Component {
  state = {
    show: false,
    postKeterangan: "",

    postLokasi: "",
    postSuka: 0,
    postKomentar: [],
    postUserId: 1,
    id_user_yg_post: 0,
    addFileName: "",
    addFile: "",
  };

  addPost = () => {
    const formData = new FormData();

    formData.append("keterangan", this.state.postKeterangan);
    formData.append("lokasi", this.state.postLokasi);
    formData.append("id_user_yg_post", this.props.userGlobal.id_user);
    formData.append("image", this.state.addFile);

    Axios.post(`${API_URL}/post/upload`, formData)
      .then((result) => {
        Swal.fire("Good job!", "You clicked the button!", "success");

        this.setState({
          postKeterangan: "",
          postLokasi: "",
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // addPost = () => {
  //   let formData = new FormData();

  //   let obj = {
  //     keterangan: this.state.postKeterangan,
  //     lokasi: this.state.postLokasi,
  //     id_user_yg_post: this.props.userGlobal.id_user,
  //   };
  //   console.log(this.props.userGlobal.id_user);

  //   formData.append("data", JSON.stringify(obj));
  //   formData.append("file", this.state.addFile);

  //   Axios.post(`${API_URL}/post/upload`, formData)
  //     .then((result) => {
  //       Swal.fire("Good job!", "You clicked the button!", "success");

  //       this.setState({
  //         postKeterangan: "",
  //         postLokasi: "",
  //       });
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  // addPost = () => {
  //   Axios.post(`http://localhost:2000/album/upload`, {
  //     foto: this.state.postFoto,
  //     keterangan: this.state.postKeterangan,
  //     lokasi: this.state.postLokasi,
  //     id_user_yg_post: this.props.userGlobal.id,

  //     // suka: this.state.postSuka,
  //     // komentar: this.state.postKomentar,
  //     // namaPengguna: this.props.userGlobal.namaPengguna,
  //     // fotoProfil: this.props.userGlobal.fotoProfil,
  //   })
  //     .then((result) => {
  //       Swal.fire("Good job!", "You clicked the button!", "success");

  //       this.setState({
  //         postKeterangan: "",
  //         postFoto: "",
  //         postLokasi: "",
  //         postSuka: 0,
  //         postKomentar: [],
  //         postUserId: 1,
  //       });
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  onBtnAddFile = (event) => {
    if (event.target.files[0]) {
      this.setState({
        addFile: event.target.files[0],
      });
      let preview = document.getElementById("foto-upload");
      preview.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  postToggle = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <Navbar
        style={{ backgroundColor: "white" }}
        expand="lg"
        className="bayangan fixed-top"
      >
        <Container fluid className="px-5">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <div className="">
            <img
              src={Logo}
              height="45"
              className="logo-kepo-kecil "
              alt="React Bootstrap"
            />
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-between navbar-kepo"
          >
            <div>
              <Link to="/">
                <img
                  src={Logo}
                  height="45"
                  className=" align-top logo-kepo"
                  alt="React Bootstrap"
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
                <div className="d-flex flex-row align-items-center my-3 my-md-0">
                  <div>
                    <Link to="/">
                      <button className="tombol mx-3 ">
                        <i class="fa-solid fa-house"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => this.postToggle(this.state.show)}
                      className="tombol mx-3"
                    >
                      <i class="fa-solid fa-circle-plus"></i>
                    </button>
                    <button className="tombol mx-3">
                      <i class="fa-solid fa-bell"></i>
                    </button>

                    <Link onClick={this.props.LogoutUser} to="/login">
                      <button className="tombol mx-3">
                        <i class="fa-solid fa-right-from-bracket"></i>
                      </button>
                    </Link>
                  </div>
                  <div>
                    <h6 className="mx-2">
                      Hai, {this.props.userGlobal.namaPengguna}
                    </h6>
                  </div>
                  <div className="profile-navbar rounded-circle my-auto">
                    <Link
                      to={
                        this.props.userGlobal.namaPengguna
                          ? `/profile/${this.props.userGlobal.namaPengguna}`
                          : `/`
                      }
                    >
                      <img
                        src={
                          this.props.userGlobal.fotoProfil == null
                            ? Foto
                            : this.props.userGlobal.fotoProfil
                        }
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
                    {/* <div>
                      <img src={Foto} alt="" />
                      <input
                        onChange={this.inputHandler}
                        value={this.state.postFoto}
                        name="postFoto"
                        type="text"
                        placeholder="Lokasi ..."
                      />
                    </div> */}
                    <div className="border form-grup ">
                      <img
                        id="foto-upload"
                        src=""
                        alt=""
                        widht="100%"
                        height="300x"
                      />
                      <label htmlFor="img">image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        // onChange={this.inputHandler}
                        onChange={this.onBtnAddFile}
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
                <Link
                  to={
                    this.props.userGlobal.namaPengguna
                      ? `/profile/${this.props.userGlobal.namaPengguna}`
                      : `/login`
                  }
                >
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
