import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as actionLogin from "../../../redux/actions/actionUser";
import { bindActionCreators } from "redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Login() {
  //form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //validation
  const [invalidEmailAddressMessage, setInvalidEmailAddressMessage] =
    useState("");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");

  //redux initialize list of user
  // const userList = useSelector((state) => state.users);

  //redux activeuser
  const { activeUser } = bindActionCreators(actionLogin, useDispatch());
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.email) {
      // navigate home page
      navigate("/");
    }
  }, [localStorage.email]);

  //handleSubmit - Login
  const handleSubmit = (e) => {
    e.preventDefault();

    activeUser({ email: email, password: password })
      .then((response) => {
        localStorage.setItem("email", email);
        if (response.payload.userType === "admin") {
          localStorage.setItem("role", response.payload.userType);
          navigate("/admin");
          window.location.reload();
        } else {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        if (email === "") {
          setInvalidEmailAddressMessage("Please Enter your username");
        } else {
          setInvalidEmailAddressMessage("User does not exist");
        }

        if (password === "") {
          setInvalidPasswordMessage("Please enter your password");
        } else {
          setInvalidPasswordMessage("Password does not match");
        }
      });
  };

  return (
    <div className="d-flex flex-column bg-dark vh-100 justify-content-center align-items-center">
      <div className="login-container w-25 border border-dark shadow px-5 py-5">
        <div className="brand-title text-white text-center">
          <span>
            PAWER<span className="color-text-secondary">CODED</span>
          </span>
        </div>
        <div className="p-3 mt-2">
          <hr className="text-secondary" />
          <small className="text-white">SIGN IN</small>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 mt-3"
            >
              <Form.Control
                type="text"
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
              <Form.Control.Feedback type="invalid">
                {invalidPasswordMessage}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Form.Group className="my-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                className="text-secondary"
                label="Remember me?"
              />
            </Form.Group>
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 rounded-0 my-3"
            >
              <small className="text-sm"> LOG IN NOW</small>
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
  );
}

export default Login;
