import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Navbar,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as actionUser from "../redux/actions/actionUser";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

function NavigationBar() {
  const [isActive, setIsActive] = useState(false);
  const thisUser = localStorage.email;
  const { currentUser } = bindActionCreators(actionUser, useDispatch());
  const { logoutUser } = bindActionCreators(actionUser, useDispatch());
  const activeUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const userMenu = (
    <Image
      src={
        loading
          ? "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif"
          : image
      }
      roundedCircle
      style={{ width: "40px", height: "40px" }}
    />
  );

  // "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setImage(
        activeUser.imageLink
          ? `http://localhost:8080/user/${activeUser.userId}/download`
          : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
      );
      setLoading(false);
    }, 800);
  }, [image]);

  useEffect(() => {
    if (thisUser) {
      setIsActive(true);
      currentUser(thisUser);
    }
  }, [thisUser, isActive]);

  const signOut = () => {
    logoutUser();
    setIsActive(false);
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
  };

  const viewProfile = () => {
    navigate("/profile");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="py-4"
      fixed="top"
      style={{ backgroundColor: "#0f0e0e" }}
    >
      <Container>
        <Navbar.Brand className="text-white">
          <span>
            PAWER<span className="color-text-secondary">CODED</span>
          </span>
        </Navbar.Brand>
        <div className="nav-btns order-lg-2 d-none d-lg-block ">
          {isActive ? (
            <DropdownButton
              menuVariant="dark"
              variant="transparent"
              id="dropdown-basic-button"
              title={userMenu}
            >
              <Dropdown.Item onClick={viewProfile}>User Profile</Dropdown.Item>
              <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
            </DropdownButton>
          ) : (
            <>
              <Link
                to="/login"
                className="btn custom-btn login-btn me-2 rounded-0"
                type="button"
              >
                <span className="">LOGIN</span>
              </Link>
              <Link
                to="/register"
                className="btn custom-btn signup-btn  rounded-0"
                type="button"
              >
                <span className="">SIGNUP</span>
              </Link>
            </>
          )}
        </div>
        <Navbar.Toggle className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse className="order-lg-1">
          <ul className="navbar-nav  text-center">
            <li className="nav-item p-2">
              <NavLink to="/" className="nav-link  text-uppercase">
                HOME
              </NavLink>
            </li>
            <li className="nav-item p-2">
              <NavLink to="/about-us" className="nav-link  text-uppercase">
                ABOUT US
              </NavLink>
            </li>
            <li className="nav-item p-2">
              <NavLink to="/forum" className="nav-link  text-uppercase">
                FORUM
              </NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
