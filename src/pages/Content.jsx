import React, { Component } from "react";
import Like from "../img/icon/like.png";
import Comment from "../img/icon/comment.png";
import "./Content.css";
import Foto from "../img/default-profile.jpg";
import { Button, Modal, Row, FloatingLabel, Form } from "react-bootstrap";
import { API_URL } from "../Constant/API";
import Axios from "axios";
import Ubah from "../img/icon/ubah.png";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";

class Content extends Component {
  state = {
    postData: {},
    show: false,
    postKomen: [],
    editKeterangan: "",
    editLokasi: "",
    suka: 0,

    isiKomentar: "",
  };

  addKomen = () => {
    if (this.state.isiKomentar) {
      Axios.post(`${API_URL}/komentar/post/${this.state.postData.id_post}`, {
        isi: this.state.isiKomentar,
        id_user_yg_komen: this.props.userGlobal.id_user,
        id_komen_ini_ada_di_post_apa: parseInt(this.props.match.params.postId),
      })
        .then(() => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.fetchPostKomen();
          this.setState({ isiKomentar: "" });
        })
        .catch(() => {
          alert("eror nambah komen");
        });
    }
  };

  fetchPostData = () => {
    console.log(this.props.match.params.postId);
    Axios.get(`${API_URL}/post/${this.props.match.params.postId}`).then(
      (result) => {
        console.log(result.data[0]);
        this.setState({ postData: result.data[0] });
      }
    );
  };

  fetchPostKomen = () => {
    Axios.get(`${API_URL}/komentar/${this.props.match.params.postId}`).then(
      (result) => {
        console.log(result.data);
        this.setState({ postKomen: result.data });
      }
    );
  };

  fetchSuka = () => {
    Axios.get(`${API_URL}/suka/get/${this.props.match.params.postId}`).then(
      (result) => {
        this.setState({ suka: result.data.length });
      }
    );
  };

  editToggle = (editData) => {
    this.setState({
      editKeterangan: editData.keterangan,
      editLokasi: editData.lokasi,
      show: !this.state.show,
    });
  };

  inputHandler = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/post/edit/${this.state.postData.id_post}`, {
      lokasi: this.state.editLokasi,
      keterangan: this.state.editKeterangan,
    }).then(() => {
      Swal.fire("Berhasil", "Keterangan berhasil di ubah");
      this.fetchPostData();
      this.setState({ show: !this.state.show });
    });
  };

  deleteBtnHandler = () => {
    Axios.post(`${API_URL}/post/delete/${this.state.postData.id_post}`, {
      old_img: this.state.postData.foto,
    })
      .then(() => {
        Swal.fire({
          icon: "error",
          title: "Terhapus",
          text: "Foto berhasil dihapus",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderKomen = () => {
    return this.state.postKomen.map((val) => {
      return <Komentar komentarData={val} />;
    });
  };

  componentDidMount() {
    this.fetchPostData();
    this.fetchPostKomen();
    this.fetchSuka();
  }

  render() {
    if (this.props.userGlobal.namaPengguna) {
      return (
        <div
          className="container-fluid pt-5"
          style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
        >
          <div className="container py-5">
            <div className="row">
              <div className="col-md-7 col-sm-12 mb-5">
                <div className="bingkai bayangan">
                  <img
                    className="foto-content"
                    alt=""
                    src={API_URL + this.state.postData.foto}
                  />
                </div>
              </div>
              <div className="col-md-5 col-sm-12 ">
                <div className="profile-content bayangan bingkai-profile">
                  <div className=" d-flex justify-content-between mx-3 my-1 border-bottom  border-1">
                    <div className="d-flex">
                      <div className="profile-navbar rounded-circle my-aut">
                        <img
                          src={
                            this.state.postData.fotoProfil == null
                              ? Foto
                              : API_URL + this.state.postData.fotoProfil
                          }
                          alt=""
                          srcset=""
                        />
                      </div>
                      <div className="mx-2">
                        <h6 className="username">
                          {this.state.postData.namaPengguna}
                        </h6>
                        <h6 className="lokasi">{this.state.postData.lokasi}</h6>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-end">
                        {this.props.userGlobal.namaPengguna ===
                        this.state.postData.namaPengguna ? (
                          <img
                            onClick={() => this.editToggle(this.state.postData)}
                            src={Ubah}
                            alt=""
                            height="18"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end tanggal mx-3 mb-1">
                    <i class="fa-solid fa-calendar"></i>
                    <p>{this.state.postData.tanggal}</p>
                  </div>
                  <div className="mx-3">
                    <p>{this.state.postData.keterangan}</p>
                  </div>
                  {this.renderKomen()}
                  {this.props.userGlobal.status === "verified" ? (
                    <div className="d-flex flex-row m-3">
                      <div className="d-flex komentar">
                        <input
                          name="isiKomentar"
                          type="text"
                          placeholder="Komentar ..."
                          onChange={this.inputHandler}
                          value={this.state.isiKomentar}
                        />
                        <div className=" kirim-komentar">
                          <i
                            onClick={this.addKomen}
                            class="fa-solid fa-paper-plane icon-kirim"
                          ></i>
                        </div>
                      </div>
                      <img src={Like} alt="" className="icon" />
                      <p>{this.state.suka}</p>
                      <img src={Comment} alt="" className="icon" />
                      <p>{this.state.postKomen.length}</p>
                    </div>
                  ) : null}
                  <Link to={`/profile/${this.state.postData.namaPengguna}`}>
                    <div className="d-grid gap-2 mx-3 mb-3">
                      <Button
                        style={{
                          backgroundColor: "rgba(89, 112, 157, 1)",
                          borderColor: "rgba(89, 112, 157, 1)",
                        }}
                        size="lg"
                      >
                        Kepo
                      </Button>{" "}
                    </div>
                  </Link>
                </div>
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
                    Ubah Postingan
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Keterangan"
                    >
                      <Form.Control
                        as="textarea"
                        onChange={this.inputHandler}
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                        className="mb-3"
                        name="editKeterangan"
                        value={this.state.editKeterangan}
                      />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea" label="Lokasi">
                      <Form.Control
                        as="textarea"
                        onChange={this.inputHandler}
                        placeholder="Leave a comment here"
                        name="editLokasi"
                        value={this.state.editLokasi}
                      />
                    </FloatingLabel>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div
                    onClick={() => this.setState({ show: !this.state.show })}
                  >
                    {" "}
                    <Link to={`/profile/${this.props.userGlobal.namaPengguna}`}>
                      <Button
                        onClick={() => this.deleteBtnHandler()}
                        variant="danger"
                      >
                        Hapus
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Button
                      className="mx-3"
                      onClick={() => this.setState({ show: !this.state.show })}
                      variant="secondary"
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={() => this.saveBtnHandler()}
                      variant="primary"
                    >
                      Simpan
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>
            </Row>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

class Komentar extends React.Component {
  render() {
    return (
      <div className=" mx-3 my-0">
        <div className="komentar-content d-flex justify-content-start my-1 mx-0">
          <div className="foto-profile rounded-circle my-0">
            <img
              src={
                this.props.komentarData.fotoProfil == null
                  ? Foto
                  : API_URL + this.props.komentarData.fotoProfil
              }
              alt=""
              srcset=""
            />
          </div>
          <div className="ms-4">
            <h6 className="username my-0">
              {this.props.komentarData.namaPengguna}
            </h6>
            <p>{this.props.komentarData.isi}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Content);
