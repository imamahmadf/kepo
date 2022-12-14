import Post from "../component/Post";
import React from "react";
import Axios from "axios";
import { API_URL } from "../Constant/API";
import Foto from "../img/default-profile.jpg";
import Story from "../component/story";
import "./home.css";
import { connect } from "react-redux";
import Kontak from "../img/icon/kontak.png";
import Cari from "../img/icon/cari.png";
import InfiniteScroll from "react-infinite-scroller";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  state = {
    post: [],
    users: [],
    hasMoreItems: true,
    page: 1,
  };

  fetchPost = () => {
    Axios.get(`${API_URL}/post/get/${this.state.page}`)
      .then((result) => {
        // this.setState({ post: result.data });
        this.setState({ post: [...this.state.post, ...result.data] });
        this.setState({ page: this.state.page + 1 });

        // console.log(this.state.post);
        // console.log(result.data.length);

        if (result.data?.length == 0) {
          this.setState({ hasMoreItems: false });
        } else {
          this.setState({ hasMoreItems: true });
          // alert(this.state.hasMoreItems);
        }
        console.log(this.state.page, this.state.post);
        // alert("abc");
      })
      .catch(() => {
        alert("terjadi kesalahan di serveraaa");
      });
  };

  renderPost = () => {
    return this.state.post.map((val) => {
      return <Post postData={val} />;
    });
  };

  render() {
    if (!this.props.userGlobal.nama) {
      return <Redirect to="/login" />;
    }
    return (
      <div
        className="row"
        style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
      >
        <div className="col-lg-2 col-12 kotak-kiri-home ">
          <div className="py-3 sticky-lg-top ">
            <div style={{ height: "70px" }}></div>
            <div className="kotak-profil bayangan flex-column ">
              <div className="profile-home mx-auto rounded-circle mt-3">
                <img
                  className=""
                  alt=""
                  srcSet={
                    this.props.userGlobal.fotoProfil == null
                      ? Foto
                      : API_URL + this.props.userGlobal.fotoProfil
                  }
                />
              </div>
              <div>
                <h3 className="text-center">{this.props.userGlobal.nama}</h3>
                <p className="text-center">{this.props.userGlobal.bio}</p>
              </div>
              {this.props.userGlobal.status === "unverified" ? (
                <div className="bg-danger varifikasi text-center">
                  <h6>verifikasi akun Anda</h6>
                </div>
              ) : null}
            </div>

            {/* tombol home */}
            <div className="row mt-4 home-button bayangan p-2">
              <div className="py-2 col-sm-6 col-md-12 d-flex align-items-center ">
                <button className="tombol bayangan me-2">
                  <i class="fa-solid fa-user-group"></i>
                </button>
                <p>Grup</p>
              </div>
              <div className="py-2 col-sm-6 col-md-12 d-flex align-items-center">
                <button className="tombol bayangan me-2">
                  <i class="fa-solid fa-gamepad"></i>
                </button>
                <p>Permainan</p>
              </div>
              <div className="py-2 col-sm-6 col-md-12 d-flex align-items-center">
                <button className="tombol bayangan me-2">
                  <i class="fa-solid fa-star"></i>
                </button>
                <p>Suka</p>
              </div>
              <div className="py-2 col-sm-6 col-md-12 d-flex align-items-center">
                <button className="tombol bayangan me-2">
                  <i class="fa-solid fa-gift"></i>
                </button>
                <p>Hadiah</p>
              </div>
              <div className="py-2 col-sm-6 col-md-12 d-flex align-items-center">
                <button className="tombol bayangan me-2">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <p>Info</p>
              </div>
              <div className="py-2 col-12 d-grid gap-2">
                <button className="btn bayangan me-2">Lainnya...</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 home">
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
          {/* <div className="row justify-content-center">{this.renderPost()}</div> */}
          <div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.fetchPost}
              hasMore={this.state.hasMoreItems}
              // loader={
              //   <div className="loader" key={0}>
              //     Loading ...
              //   </div>
              // }
            >
              {
                <div className="row justify-content-center">
                  {this.renderPost()}
                </div>
              }
            </InfiniteScroll>
          </div>
        </div>
        <div className="col-lg-2 col-12 kotak-kanan-home d-md-none d-lg-block">
          <div className="pt-3 sticky-lg-top">
            <div style={{ height: "70px" }}></div>
            <div className="kotak-informasi bayangan p-2">
              <p className="mb-1">ACARA TERDEKAT</p>
              <div className="acara-gambar bg-dark">
                <img
                  srcSet="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/05/28/2252965506.jpg"
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
                <button type="button" className="btn btn-primary mt-3 mb-1">
                  Acara Lainnya
                </button>
              </div>
            </div>
            <div className="kotak-kontak bayangan p-3 my-3 ">
              <div className="d-flex ">
                <div className="icon-kontak">
                  <img srcSet={Kontak} alt="" />
                </div>
                <div className="ms-2">
                  <p>Kontak</p>
                </div>
                <div className="input-kontak">
                  <span>
                    <img srcSet={Cari} alt="" />
                  </span>
                  <input type="text" placeholder="cari.." />
                </div>
              </div>
              <div className="d-flex pembungkus-kontak my-3 bayangan">
                <div className="foto-profile rounded-circle mb-0">
                  <img
                    srcSet="https://images.unsplash.com/photo-1663765602888-21975b91e849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80"
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
                    srcSet="https://images.unsplash.com/photo-1659482634001-7e2571dec3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=708&q=80"
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
                    srcSet="https://images.unsplash.com/photo-1657214059233-5626b35eb349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMzR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
