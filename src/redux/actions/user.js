import Axios from "axios";
import { API_URL } from "../../Constant/API";
import Swal from "sweetalert2";

export const registerUser = ({
  nama,
  namaPengguna,
  email,
  kataSandi,
  kataSandiUlang,
  fotoProfil,
}) => {
  return (dispatch) => {
    if (kataSandi === kataSandiUlang) {
      Axios.post(`${API_URL}/kepo/register`, {
        nama,
        namaPengguna,
        email,
        kataSandi,
        kataSandiUlang,
        fotoProfil,
        bio: "ceritakan dirimu",
      })
        .then((result) => {
          console.log(result.data);
          dispatch({
            type: "USER_LOGIN",
            payload: result.data,
          });
          Swal.fire({
            icon: "success",
            title: "Selamat Datang di Kepo",
            text: "Silahkan Verifikasi Akun Anda!",
          });
        })
        .catch(() => {
          alert(`gagal mendfatar silahkan mendaftar ulang action`);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "kata Sandi tidak sesuai",
        text: "cek ulang kata sandi anda",
      });
    }
  };
};

export const loginUser = ({ namaPengguna, kataSandi }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/kepo/login`, {
      params: {
        namaPengguna,
        kataSandi,
      },
    })
      .then((result) => {
        console.log("hasil" + result);
        if (result) {
          delete result.data[0].kataSandi;
          console.log(result.data[0]);
          localStorage.setItem("userDataKepo", JSON.stringify(result.data[0]));
          dispatch({
            type: "USER_LOGIN",
            payload: result.data[0],
          });
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "kata sandi salah",
          });
        }
      })
      .catch((err) => {
        alert(`terjadi kesalahan ke server ketika login`);
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
    Axios.get(`${API_URL}/kepo/login`, {
      params: {
        id_user: userData.id,
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

export const EditProfileGlobal = (data) => {
  console.log("Data masuk Action dari component :", data);
  return {
    type: "USER_EDIT",
    payload: data,
  };
};
