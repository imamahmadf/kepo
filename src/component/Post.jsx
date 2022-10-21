import { Card } from "react-bootstrap";
import "./post.css";
import Like from "../img/icon/like.png";
import Comment from "../img/icon/comment.png";
import React from "react";
import { Link } from "react-router-dom";
import Kirim from "../img/icon/kirim.png";
import Foto from "../img/default-profile.jpg";
import Axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../Constant/API";

class BasicExample extends React.Component {
  state = {
    isiKomentar: "",
  };

  addKomen = () => {
    if (this.state.isiKomentar) {
      Axios.post(`${API_URL}/komentar/post/${this.props.postData.id_post}`, {
        isi: this.state.isiKomentar,
        id_user_yg_komen: this.props.userGlobal.id_user,
        id_komen_ini_ada_di_post_apa: parseInt(this.props.postData.id_post),
      })
        .then(() => {
          this.setState({ isiKomentar: "" });
        })
        .catch(() => {
          alert("eror nambah komen");
        });
    }
  };

  inputHandler = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className=" col-xl-4 col-md-6 col-sm-12 py-3 ">
        <Card className=" foto-utama ">
          <Link to={`/content/${this.props.postData.id_post}`}>
            <Card.Img
              variant="top"
              src={"http://localhost:3400" + this.props.postData.foto}
              className="gambar"
            />
          </Link>
          <Card.Body className="pb-1">
            <div className="d-flex flex-row">
              <div className="foto-profile rounded-circle">
                <Link to={`/profile/${this.props.postData.namaPengguna}`}>
                  <img
                    src={
                      this.props.postData.fotoProfil == null
                        ? Foto
                        : API_URL + this.props.postData.fotoProfil
                    }
                    alt=""
                  />{" "}
                </Link>
              </div>
              <div className="keterangan">
                <h6 className="username">{this.props.postData.namaPengguna}</h6>
                <h6 className="lokasi">{this.props.postData.lokasi}</h6>
              </div>
            </div>
            {this.props.userGlobal.status === "verified" ? (
              <div className="d-flex flex-row">
                <div className="d-flex komentar">
                  <input
                    type="text"
                    name="isiKomentar"
                    placeholder="Komentar ..."
                    onChange={this.inputHandler}
                    value={this.state.isiKomentar}
                  />
                  <Link
                    to={
                      this.state.isiKomentar
                        ? `/content/${this.props.postData.id_post}`
                        : `/`
                    }
                  >
                    <div className=" kirim-komentar">
                      <i
                        onClick={this.addKomen}
                        class="fa-solid fa-paper-plane icon-kirim"
                      ></i>
                    </div>
                  </Link>
                </div>
                <img src={Like} alt="" className="icon" />
                <p>{this.props.postData.total_suka}</p>
                <img src={Comment} alt="" className="icon" />
                <p>{this.props.postData.total_komentar}</p>
              </div>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(BasicExample);
