import Axios from "axios";
import { API_URL } from "../../Constant/API";

export const registerUser = ({
  nama,
  namaPengguna,
  email,
  kataSandi,
  fotoProfil,
}) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/kepo/register`, {
      nama,
      namaPengguna,
      email,
      kataSandi,
      fotoProfil,
      bio: "ceritakan dirimu",
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
    Axios.get(`${API_URL}/kepo/login`, {
      params: {
        namaPengguna,
        kataSandi,
      },
    })
      .then((result) => {
        delete result.data[0].kataSandi;
        console.log(result.data[0]);
        localStorage.setItem("userDataKepo", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
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
