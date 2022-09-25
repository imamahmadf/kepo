import Post from "../component/Post";
import React from "react";
import Axios from "axios";
import { API_URL } from "../Constant/API";

import Story from "../component/story";
import "./home.css";
import { connect } from "react-redux";
import KepoLogoPutih from "../img/logo/KepoLogoPutih.png";
import Lokasi from "../img/icon/lokasi.png";
import Foto from "../img/icon/foto.png";
import Swal from "sweetalert2";
import Upload from "./Upload";
import Kontak from "../img/icon/kontak.png";
import Cari from "../img/icon/cari.png";
class Home extends React.Component {
  state = {
    post: [],
    users: [],

    postKeterangan: "",
    postFoto: "",
    postLokasi: "",
    postSuka: 0,
    postKomentar: [],
    postUserId: 1,
  };

  fetchPost = () => {
    Axios.get(`${API_URL}/post`)
      .then((result) => {
        console.log(result);
        this.setState({ post: result.data });
      })
      .catch(() => {
        alert("terjadi kesalahan di serveraaa");
      });
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
      .then(() => {
        Swal.fire({
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: { foto: this.state.postFoto },
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
        this.fetchPost();
        this.setState({
          postKeterangan: "",
          postFoto: "",
          postLokasi: "",
          postSuka: 0,
          postKomentar: [],
          postUserId: 1,
        });
      })
      .catch(() => {
        alert("gagal addPsot");
      });
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };
  renderPost = () => {
    return this.state.post.map((val) => {
      return <Post postData={val} />;
    });
  };

  componentDidMount() {
    this.fetchPost();
  }

  render() {
    return (
      <div
        className="row"
        style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
      >
        <div className="col-lg-2 col-12 kotak-kiri-home ">
          <div className="pt-3 sticky-lg-top">
            <div style={{ height: "70px" }}></div>
            <div className="kotak-profil bayangan flex-column ">
              <div className="profile-home mx-auto rounded-circle mt-3">
                <img
                  className=""
                  alt=""
                  src={this.props.userGlobal.fotoProfil}
                />
              </div>
              <div>
                <h3 className="text-center">{this.props.userGlobal.nama}</h3>
                <p className="text-center">{this.props.userGlobal.bio}</p>
              </div>
              <Upload />
            </div>
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
                <div>
                  <button
                    onClick={() => this.addPost(this.state)}
                    className="tombol-post px-3 py-1"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 " style={{ marginTop: "70px" }}>
          <div className="pembungkus-story">
            <div className="story bayangan flex-row d-flex">
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
            </div>
          </div>
          <div className="row justify-content-center">{this.renderPost()}</div>
        </div>
        <div className="col-lg-2 col-12 kotak-kanan-home d-md-none d-lg-block">
          <div className="pt-3 sticky-lg-top">
            <div style={{ height: "70px" }}></div>
            <div className="kotak-informasi bayangan p-2">
              <p className="mb-1">ACARA TERDEKAT</p>
              <div className="acara-gambar bg-dark">
                <img
                  src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/05/28/2252965506.jpg"
                  alt=""
                />
              </div>
              <div className="row acara border-bottom border-2 p-2">
                <div className="col-3 bayangan tanggal-acara">
                  <p>21</p>
                  <p>MAY</p>
                </div>
                <div className="col-9  ">
                  <p className="m-0">Indonesia</p>
                  <p className="m-0">Pantura</p>
                </div>
                <button type="button" class="btn btn-primary mt-3 mb-1">
                  Primary
                </button>
              </div>
            </div>
            <div className="kotak-kontak bayangan p-3 my-3 ">
              <div className="d-flex ">
                <div className="icon-kontak">
                  <img src={Kontak} alt="" />
                </div>
                <div className="ms-2">
                  <p>Kontak</p>
                </div>
                <div className="input-kontak">
                  <span>
                    <img src={Cari} alt="" />
                  </span>
                  <input type="text" placeholder="cari.." />
                </div>
              </div>
              <div className="d-flex pembungkus-kontak my-3 bayangan">
                <div className="foto-profile rounded-circle mb-0">
                  <img
                    src="https://images.unsplash.com/photo-1663765602888-21975b91e849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80"
                    alt=""
                  />
                </div>
                <div>
                  <p className="nama-kontak">Gol D. Roger</p>

                  <div className="d-flex align-items-center ms-2">
                    <div className="online rounded-circle "></div>

                    <p className="nama-online">online</p>
                  </div>
                </div>
              </div>
              <div className="d-flex pembungkus-kontak my-3 bayangan">
                <div className="foto-profile rounded-circle mb-0">
                  <img
                    src="https://images.unsplash.com/photo-1659482634001-7e2571dec3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=708&q=80"
                    alt=""
                  />
                </div>
                <div>
                  <p className="nama-kontak">Gol D. Roger</p>

                  <div className="d-flex align-items-center ms-2">
                    <div className="online rounded-circle "></div>

                    <p className="nama-online">online</p>
                  </div>
                </div>
              </div>
              <div className="d-flex pembungkus-kontak my-3 bayangan">
                <div className="foto-profile rounded-circle mb-0">
                  <img
                    src="https://images.unsplash.com/photo-1657214059233-5626b35eb349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMzR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <p className="nama-kontak">Gol D. Roger</p>

                  <div className="d-flex align-items-center ms-2">
                    <div className="online rounded-circle "></div>

                    <p className="nama-online">online</p>
                  </div>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps)(Home);
