import React, { Component } from "react";
import Like from "../img/icon/like.png";
import Comment from "../img/icon/comment.png";
import "./Content.css";

import { Button, Modal, Row, FloatingLabel, Form } from "react-bootstrap";
import { API_URL } from "../Constant/API";
import Axios from "axios";
import Ubah from "../img/icon/ubah.png";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Kirim from "../img/icon/kirim.png";
import { Link } from "react-router-dom";

class Content extends Component {
  state = {
    postData: {},
    show: false,
    postKomen: [],
    editKeterangan: "",
    editLokasi: "",

    isiKomentar: "",
  };

  // addKomen = () => {
  //   Axios.post(`${API_URL}/post/${this.state.postData.id}`, {})
  //     .then(() => {
  //       this.fetchPostKomen();
  //     })
  //     .catch(() => {
  //       alert("eror nambah komen");
  //     });
  // };

  fetchPostData = () => {
    Axios.get(`${API_URL}/post`, {
      params: {
        id: this.props.match.params.postId,
      },
    }).then((result) => {
      this.setState({ postData: result.data[0] });
    });
  };

  fetchPostKomen = () => {
    Axios.get(`${API_URL}/post`, {
      params: {
        id: this.props.match.params.postId,
      },
    }).then((result) => {
      this.setState({ postKomen: result.data[0].komentar });
    });
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
    Axios.patch(`${API_URL}/post/${this.state.postData.id}`, {
      lokasi: this.state.editLokasi,
      keterangan: this.state.editKeterangan,
    }).then(() => {
      Swal.fire("Good job!", "You clicked the button!", "success");
      this.fetchPostData();
      this.setState({ show: !this.state.show });
    });
  };

  deleteBtnHandler = (deleteId) => {
    Axios.delete(`${API_URL}/post/${deleteId}`).then(() => {
      alert("berhasil hapus");
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
  }

  render() {
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
                  src={this.state.postData.foto}
                />
              </div>
            </div>
            <div className="col-md-5 col-sm-12 ">
              <div className="profile-content bayangan bingkai-profile">
                <div className=" d-flex justify-content-between m-3 border-bottom  border-1">
                  <div className="d-flex">
                    <div className="profile-navbar rounded-circle my-aut">
                      <img
                        src={this.state.postData.fotoProfil}
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

                <div className="m-3">
                  <p>{this.state.postData.keterangan}</p>
                </div>
                {this.renderKomen()}
                <div className="d-flex flex-row m-3">
                  <div className="d-flex komentar">
                    <input
                      name="isiKomentar"
                      type="text"
                      placeholder="Komentar ..."
                      onChange={this.inputHandler}
                    />
                    <img
                      src={Kirim}
                      // onClick={this.addKomen()}
                      alt=""
                      className="icon-kirim "
                    />
                  </div>
                  <img src={Like} alt="" className="icon" />
                  <p>{this.state.postData.suka}</p>
                  <img src={Comment} alt="" className="icon" />
                  <p></p>
                </div>
                <div className="d-grid gap-2 mx-3 mb-3">
                  <Button
                    onClick={() => this.handleShow()}
                    style={{
                      backgroundColor: "rgba(89, 112, 157, 1)",
                      borderColor: "rgba(89, 112, 157, 1)",
                    }}
                    size="lg"
                  >
                    Kepo
                  </Button>
                </div>
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
                <div onClick={() => this.setState({ show: !this.state.show })}>
                  {" "}
                  <Link to="/profile">
                    <Button
                      onClick={() =>
                        this.deleteBtnHandler(this.state.postData.id)
                      }
                      variant="danger"
                    >
                      Hapus
                    </Button>
                  </Link>
                </div>
                <div>
                  <Button
                    onClick={() => this.setState({ show: !this.state.show })}
                    variant="secondary"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => this.saveBtnHandler()}
                    variant="primary"
                  >
                    Save
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </Row>
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

class Komentar extends React.Component {
  render() {
    return (
      <div className=" mx-3 my-0">
        <div className="komentar-content d-flex justify-content-start my-1 mx-0">
          <div className="foto-profile rounded-circle my-0">
            <img src={this.props.komentarData.fotoProfil} alt="" srcset="" />
          </div>
          <div className="ms-4">
            <h6 className="username">{this.props.komentarData.namaPengguna}</h6>
          </div>
        </div>

        <p>{this.props.komentarData.isiKomentar}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Content);
