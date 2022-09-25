import Axios from "axios";
import { API_URL } from "../../Constant/API";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export const registerUser = ({
  nama,
  namaPengguna,
  email,
  kataSandi,
  fotoProfil,
  bio,
}) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, {
      nama,
      namaPengguna,
      email,
      kataSandi,
      fotoProfil,
      bio,
    })
      .then((result) => {
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert(`Selamat datang di Kepo`);
      })
      .catch(() => {
        alert(`gagal mendfatar silahkan mendaftar ulang action`);
      });
  };
};

export const loginUser = ({ namaPengguna, kataSandi }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        namaPengguna,
      },
    })
      .then((result) => {
        if (result.data.length) {
          if (kataSandi === result.data[0].kataSandi) {
            delete result.data[0].kataSandi;

            localStorage.setItem(
              "userDataKepo",
              JSON.stringify(result.data[0])
            );
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            // handle eror rong pass
            dispatch({
              type: "USER_ERROR",
              payload: "Kata Sandi Salah",
            });
          }
        } else {
          // handle eror user name not found
          dispatch({
            type: "USER_ERROR",
            payload: "User name tidak ditemukan",
          });
        }
      })
      .catch((err) => {
        alert(`terjadi kesalahan ke server`);
      });
  };
};

export const LogoutUser = () => {
  localStorage.removeItem("userDataKepo");
  return {
    type: "USER_LOGOUT",
  };
};

export const UserKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        alert("TESSSS! userKeepLogin");
        delete result.data[0].kataSandi;

        localStorage.setItem("userDataKepo", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch(() => {
        alert(`terjadi kesalahan ke server`);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};

export const EditProfile = ({
  editNama,
  editNamaPengguna,
  editKataSandi,
  editBio,
  editFotoProfil,
  id,
}) => {
  return (dispatch) => {
    Axios.patch(`${API_URL}/users/${id}`, {
      nama: editNama,
      namaPengguna: editNamaPengguna,
      kataSandi: editKataSandi,
      fotoProfil: editFotoProfil,
      bio: editBio,
    })
      .then((result) => {
        console.log(result.data);
        dispatch({
          type: "USER_EDIT",
          payload: result.data,
        });

        Swal.fire("Good job!", "You clicked the button!", "success");
        <Redirect to="/profile" />;
      })
      .catch(() => {
        alert("terjadi kesalahan di server");
      });
  };
};
