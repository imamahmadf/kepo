import { Card } from "react-bootstrap";
import "./post.css";
import Like from "../img/icon/like.png";
import Comment from "../img/icon/comment.png";
import React from "react";
import { Link } from "react-router-dom";
import Kirim from "../img/icon/kirim.png";

class BasicExample extends React.Component {
  state = {
    like: 100,
    dislike: 4,
    likeactive: false,
    dislikeactive: false,
  };

  likef = () => {
    if (this.state.likeactive) {
      this.setState({ likeactive: false });
      this.setState({ like: this.state.like - 1 });
    } else {
      this.setState({ likeactive: true });
      this.setState({ like: this.state.like + 1 });
      if (this.state.dislikeactive) {
        this.setState({ dislikeactive: false });
        this.setState({ like: this.state.like + 1 });
        this.setState({ dislike: this.state.dislike - 1 });
      }
    }
  };

  render() {
    return (
      <div className=" col-xl-4 col-md-6 col-sm-12 py-3 ">
        <Card className=" foto-utama ">
          <Link to={`/content/${this.props.postData.id}`}>
            <Card.Img
              variant="top"
              src={this.props.postData.foto}
              className="gambar"
            />
          </Link>
          <Card.Body className="pb-1">
            <div className="d-flex flex-row">
              <div className="foto-profile rounded-circle">
                <img src={this.props.postData.fotoProfil} alt="" />
              </div>
              <div className="keterangan">
                <h6 className="username">{this.props.postData.namaPengguna}</h6>
                <h6 className="lokasi">{this.props.postData.lokasi}</h6>
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="d-flex komentar">
                <input type="text" name="" placeholder="Komentar ..." />
                <img src={Kirim} alt="" className="icon-kirim " />
              </div>
              <img onClick={this.likef} src={Like} alt="" className="icon" />
              <p>{this.props.postData.suka}</p>
              <img src={Comment} alt="" className="icon" />
              <p>{this.state.like}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default BasicExample;
