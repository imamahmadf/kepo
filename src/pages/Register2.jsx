import { useState } from "react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";

function RegisterPages() {
  YupPassword(Yup);

  const [inputemail, setinputEmail] = useState("");
  const [inputPassword, SetInputPassword] = useState("");
  let nav = useNavigate();
  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      kataSandi: "",
      nama: "",
      namaPengguna: "",
      bio: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(""),
      email: Yup.string()
        .required("harap isi email")
        .email("format bukan email"),
      password: Yup.string()
        .required("harap isi password")
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minNumbers(1, "password must contain at least 1 number")
        .minSymbols(1, "password must contain at least 1 special character"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      Register(values);
    },
  });

  return (
    <div>
      <h1>aa</h1>
    </div>
  );
}

export default RegisterPages;
