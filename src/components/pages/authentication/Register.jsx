import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actionUser from "../../../redux/actions/actionUser";
import { useEffect } from "react";

function Register() {
  //inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createUser } = bindActionCreators(actionUser, useDispatch());
  const navigate = useNavigate();

  //validation
  const [invalidUsernameMessage, setInvalidUsernameMessage] = useState("");
  const [invalidEmailAddressMessage, setInvalidEmailAddressMessage] =
    useState("");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");

  useEffect(() => {
    if (localStorage.email) {
      // navigate home page
      navigate("/");
    }
  }, [localStorage.email]);

  //register user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      createUser({
        username: username,
        email: email,
        password: password,
        userType: null,
      })
        .then((response) => {
          //if success
          notify();
          console.log(response);
        })
        .catch((error) => {
          setInvalidEmailAddressMessage("email already exist");
          console.log(error, "error");
        });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    // check if username is valid
    if (username.match("^$|^.*@.*..*$")) {
      isValid = false;
      setInvalidUsernameMessage("Please enter your username");
    } else if (username.length < 4) {
      setInvalidUsernameMessage("Username length must be greater than 3");
      isValid = false;
    } else {
      setInvalidUsernameMessage("");
    }

    //check if email address is valid
    if (email === "") {
      isValid = false;
      setInvalidEmailAddressMessage("Please enter your email address");
    } else {
      setInvalidEmailAddressMessage("");
    }

    //check if password is valid and is match
    if (password.match("^$|^.*@.*..*$")) {
      isValid = false;
      setInvalidPasswordMessage("Please Enter a Password");
    } else if (password !== confirmPassword) {
      isValid = false;
      setInvalidPasswordMessage("Password doesn't match");
    } else {
      setInvalidPasswordMessage("");
    }
    return isValid;
  };

  const notify = () => {
    toast.success("Successfully created an account", {
      theme: "dark",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className="d-flex flex-column bg-dark vh-100 justify-content-center align-items-center">
        <div className="login-container  w-25 border border-dark shadow px-5 py-5">
          <div className="brand-title text-white text-center">
            <span>
              PAWER<span className="color-text-secondary">CODED</span>
            </span>
          </div>
          <div className="p-3 mt-2">
            <hr className="text-secondary" />
            <small className="text-white">CREATE ACCOUNT</small>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3 mt-3"
              >
                <Form.Control
                  type="text"
                  placeholder="johndoe123"
                  className="rounded-0 bg-secondary border-0 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={invalidUsernameMessage === "" ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  {invalidUsernameMessage}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3 mt-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="rounded-0 bg-secondary border-0 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={invalidEmailAddressMessage === "" ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  {invalidEmailAddressMessage}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="rounded-0 bg-secondary border-0 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={invalidPasswordMessage === "" ? false : true}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-0 my-3 bg-secondary border-0 text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={invalidPasswordMessage === "" ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  {invalidPasswordMessage}
                </Form.Control.Feedback>
              </FloatingLabel>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-0 my-3"
              >
                <small className="text-sm">REGISTER NOW</small>
              </button>
              <Link to="/" className="text-decoration-none">
                <small className="text-primary">
                  <FontAwesomeIcon icon={faArrowLeft} /> Back to Home page
                </small>
              </Link>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
