import React from "react";
import { Button, Modal, Row, FloatingLabel, Form } from "react-bootstrap";
import Post from "../component/Post";
import { connect } from "react-redux";
import "./profile.css";
import Pengaturan from "../img/icon/pengaturan.png";
import Axios from "axios";
import { API_URL } from "../Constant/API";
import { EditProfile } from "../redux/actions/user";
import Foto from "../img/default-profile.jpg";

class Profile extends React.Component {
  state = {
    post: [],
    show: false,
    user: [],

    id: this.props.userGlobal.id,
    editNama: "",
    editNamaPengguna: "",
    editKataSandi: "",
    editFotoProfil: "",
    editBio: "",
  };

  fetchProfile = () => {
    console.log("fetchprofil", this.props.match.params.username);
    Axios.get(`${API_URL}/kepo/login`, {
      params: {
        namaPengguna: this.props.match.params.username,
      },
    })
      .then((result) => {
        console.log("fetchprofil.then", result.data[0]);
        this.setState({ user: result.data[0] });
      })
      .catch(() => {
        alert("terjadi kesalahan di server1");
      });
  };

  fetchPost = () => {
    console.log(this.props.match.params.userId);
    Axios.get(`${API_URL}/post/profile/${this.props.match.params.username}`, {})
      .then((result) => {
        console.log("tes proffile" + result.data);

        this.setState({ post: result.data });
      })
      .catch(() => {
        alert("terjadi kesalahan di server");
      });
  };

  renderPost = () => {
    return this.state.post.map((val) => {
      return <Post postData={val} />;
    });
  };

  editToggle = (editData) => {
    console.log("edit toogle", editData);
    this.setState({
      show: true,
      editNama: editData.nama,
      editNamaPengguna: editData.namaPengguna,
      editKataSandi: editData.kataSandi,
      editFotoProfil: editData.fotoProfil,
      editBio: editData.bio,
    });
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  componentDidUpdate() {
    // this.fetchPost();
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchPost();
  }

  render() {
    return (
      <div className="container-fluid container-profile">
        <div className="container">
          <div className="row profile p-3 bayangan">
            <div className="col-md-2 col-sm-12 foto  rounded-circle">
              <img
                src={
                  this.props.userGlobal.fotoProfil == null
                    ? Foto
                    : this.props.userGlobal.fotoProfil
                }
                alt=""
                srcset=""
              />
            </div>
            <div className="col-md-10 col-sm-12">
              <h1>{this.state.user.namaPengguna}</h1>
              <p>{this.state.user.bio}</p>
              <span>
                {this.props.userGlobal.id_user === this.state.user.id_user ? (
                  <>
                    <img
                      onClick={() => this.editToggle(this.state.user)}
                      src={Pengaturan}
                      alt=""
                      srcset=""
                      style={{ width: "25px" }}
                    />
                  </>
                ) : null}
              </span>
            </div>
          </div>
          <div className="row justify-content-center py-5">
            {this.renderPost()}
          </div>
        </div>
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
              <Modal.Title id="contained-modal-title-vcenter">
                Ubah Profil
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <FloatingLabel controlId="floatingTextarea" label="nama">
                  <Form.Control
                    as="textarea"
                    onChange={this.inputHandler}
                    placeholder="Leave a comment here"
                    name="editNama"
                    value={this.state.editNama}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="nama Pengguna"
                >
                  <Form.Control
                    as="textarea"
                    onChange={this.inputHandler}
                    placeholder="Leave a comment here"
                    className="mt-3"
                    name="editNamaPengguna"
                    value={this.state.editNamaPengguna}
                  />
                </FloatingLabel>
                {/* <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Foto Profil"
                >
                  <Form.Control
                    as="textarea"
                    onChange={this.inputHandler}
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    className="mt-3"
                    name="editFotoProfil"
                    value={this.state.editFotoProfil}
                  />
                </FloatingLabel> */}
                <FloatingLabel controlId="floatingTextarea2" label="Bio">
                  <Form.Control
                    as="textarea"
                    onChange={this.inputHandler}
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    className="mt-3"
                    name="editBio"
                    value={this.state.editBio}
                  />
                </FloatingLabel>
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
                <Button
                  onClick={() => this.props.EditProfile(this.state)}
                  variant="primary"
                >
                  Save Username & Password
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </Row>
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
  EditProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
