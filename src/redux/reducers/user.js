const init_state = {
  nama: "",
  namaPengguna: "",
  email: "",
  id: 0,
  fotoProfil: "",
  bio: "",
  errMsg: "",
  storageIsChecked: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    case "USER_EDIT":
      return {
        ...state,
        ...action.payload,
        storageIsChecked: true,
      };
    default:
      return state;
  }
};
