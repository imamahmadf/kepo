import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { InputGroup, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/user";
import { Link, Redirect } from "react-router-dom";
import Logo from "../img/kepologo.png";

function Register2() {
  YupPassword(Yup);

  // const [inputemail, setinputEmail] = useState("");
  // const [inputPassword, SetInputPassword] = useState("");
  // let nav = useNavigate();
  const dispatch = useDispatch(); //mapdisparchtoprops

  const userGlobal = useSelector((state) => state.user); //mapstatetoprops

  const formik = useFormik({
    initialValues: {
      email: "",
      kataSandi: "",
      kataSandiUlang: "",
      nama: "",
      namaPengguna: "",
    },

    validationSchema: Yup.object().shape({
      nama: Yup.string().required(""),
      namaPengguna: Yup.string().required(""),
      email: Yup.string()
        .required("harap isi email")
        .email("format bukan email"),
      kataSandi: Yup.string()
        .required("harap isi kata sandi")
        .minLowercase(1, "kata sandi harus memiliki huruf kecil")
        .minUppercase(1, "kata sandi harus memiliki huruf besar")
        .minNumbers(1, "kata sandi harus memiliki angka")
        .minSymbols(1, "kata sandi harus memiliki simbol"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  if (userGlobal.namaPengguna) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid dasar p-0 ">
      <div className="container ">
        <div className="row d-flex align-items-center pembungkus-daftar">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center  ">
            <div className="tagline">
              <img src={Logo} alt="" className="logo" />

              <h1>Bagikan Keseharianmu</h1>
              <h6>untuk mereka yang hanya ingin tau</h6>
            </div>
          </div>

          <div className=" col-lg-6 col-md-12 pt-3 ">
            <div className="row d-flex justify-content-center ">
              <div className="col-8 kotak-daftar shadow ">
                <div>
                  <h5>Daftar</h5>
                  <div>
                    {formik.errors.nama ? (
                      <div className="alert alert-danger p-2">
                        {formik.errors.nama}
                      </div>
                    ) : null}
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Nama"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        formik.setFieldValue("nama", event.target.value)
                      }
                      name="nama"
                    />
                  </InputGroup>
                  <div>
                    {formik.errors.namaPengguna ? (
                      <div className="alert alert-danger p-2">
                        {formik.errors.namaPengguna}
                      </div>
                    ) : null}
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Nama Pengguna"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        formik.setFieldValue("namaPengguna", event.target.value)
                      }
                      name="namaPengguna"
                    />
                  </InputGroup>
                  <div>
                    {formik.errors.email ? (
                      <div className="alert alert-danger p-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        formik.setFieldValue("email", event.target.value)
                      }
                      name="email"
                    />
                  </InputGroup>

                  <div>
                    {formik.errors.kataSandi ? (
                      <div className="alert alert-danger p-2">
                        {formik.errors.kataSandi}
                      </div>
                    ) : null}
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Kata Sandi"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        formik.setFieldValue("kataSandi", event.target.value)
                      }
                      name="kataSandi"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Ulangi Kata Sandi"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "kataSandiUlang",
                          event.target.value
                        )
                      }
                      name="kataSandiUlang"
                    />
                  </InputGroup>
                  <div className="d-grid gap-2 ">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={formik.handleSubmit}
                    >
                      Daftar
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center  align-items-center border-top border-2 mt-3">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/login"
                    >
                      {" "}
                      <Button variant="success" className="tombol-daftar ">
                        Masuk
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid footer">
        <div className="container  text-center border-bottom border-2 p-3 d-flex bahasa">
          <p>Bahasa Indonesia</p>
          <p>Русский</p>
          <p>English (UK)</p>
          <p>日本語</p>
          <p>العربية </p>
          <p>한국어</p>
          <p>Bahasa Jawa</p>
          <p>Bahasa Sunda</p>
          <p>Bahasa Bugis</p>
          <p>Bahasa Medan</p>
          <p>Bahasa Banjar</p>
          <p>Bahasa Ambon</p>
        </div>
      </div>
    </div>
  );
}

export default Register2;
