import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPenToSquare,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import * as actionPost from "../../../redux/actions/actionPost";
import * as actionComment from "../../../redux/actions/actionComment";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const activeUser = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const { getAllPost } = bindActionCreators(actionPost, useDispatch());
  const { getUserComment } = bindActionCreators(actionComment, useDispatch());
  const [allPost, setAllPosts] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.email) {
      // navigate home page
      navigate("/");
    }
  }, [localStorage.email]);

  useEffect(() => {
    setTimeout(() => {
      getAllPost().then((response) => {
        const allPosts = response.payload;
        setAllPosts(allPosts);
      });
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getUserComment(activeUser.userId).then((response) => {
        const comments = response.payload;
        setAllComment(comments);
      });
    }, 700);
  }, []);

  const addImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", image);

    //Upload Image
    axios
      .put(`http://localhost:8080/user/${activeUser.userId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("file uploaded successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(formData.file);
  };

  return (
    <section className="p-5 mt-5">
      <Container>
        <div className="pt-5 mt-5">
          <div className="row">
            <div className="col-md-4">
              {image && (
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                  }
                  alt="profile image"
                  className="userprofile rounded-1"
                />
              )}
              {!image && !activeUser.imageLink && (
                <img
                  src={
                    "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                  }
                  alt="some image"
                  className="userprofile rounded-1"
                />
              )}
              {activeUser.imageLink && !image && (
                <img
                  src={`http://localhost:8080/user/${activeUser.userId}/download`}
                  alt={activeUser.imageLink}
                  className="userprofile rounded-1"
                />
              )}
              {!image && (
                <input
                  className="form-control mt-2"
                  type="file"
                  id="formFileMultiple"
                  onChange={addImage}
                />
              )}
              {image && (
                <>
                  {" "}
                  <button
                    className="btn btn-success w-25 me-2 mt-2"
                    onClick={uploadImage}
                  >
                    SAVE
                  </button>
                  <button
                    className="btn btn-danger w-25  mt-2"
                    onClick={() => setImage(null)}
                  >
                    CANCEL
                  </button>
                </>
              )}
              <small className="d-block mt-2 text-muted">
                {image ? (
                  <small className="text-muted">upload file {image.name}</small>
                ) : (
                  ""
                )}
              </small>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md">
                  <div className="user-details bg-white rounded-1 p-5">
                    <span className="d-block">
                      <FontAwesomeIcon icon={faUser} /> {activeUser.username}
                    </span>
                    <span className="d-block">
                      <FontAwesomeIcon icon={faEnvelope} /> {activeUser.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row g-2 mt-1 ">
                <div className="col-md">
                  <div className="number-posts bg-dark rounded-1 px-3 py-4  d-flex flex-column justify-content-evenly">
                    <small className="text-white ">POSTS</small>
                    <h1 className="text-white text-center">
                      <FontAwesomeIcon icon={faPenToSquare} />{" "}
                      {
                        allPost.filter(
                          (item) => item.userId === activeUser.userId
                        ).length
                      }
                    </h1>
                    <small className="user-dashboard">
                      number of discussions you posted
                    </small>
                  </div>
                </div>
                <div className="col-md">
                  <div className="number-comments bg-dark rounded-1 px-3 py-4  d-flex flex-column justify-content-evenly">
                    <small className="text-white ">COMMENTS</small>
                    <h1 className="text-white text-center">
                      <FontAwesomeIcon icon={faComments} /> {allComment.length}
                    </h1>
                    <small className="user-dashboard">
                      number of comments you posted
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default UserProfile;
