import React from "react";
import {
  Button,
  Container,
  Dropdown,
  FloatingLabel,
  Form,
  Image,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ForumHero from "./forum-sections/ForumHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faXmark,
  faTrash,
  faPencil,
  faComment,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionPost from "../../redux/actions/actionPost";
import * as actionUser from "../../redux/actions/actionUser";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import * as actionComment from "../../redux/actions/actionComment";

function ForumListOfPosts() {
  const { getListComments } = bindActionCreators(actionComment, useDispatch());

  //form inputs
  const [showFormInput, setShowFormInput] = useState(false);
  const [editFormInput, setEditFormInput] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [getPostId, setGetPostId] = useState("");
  const navigate = useNavigate();

  const [editPostTitle, setEditPostTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [postWasAdded, setPostWasAdded] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [postImage, setPostImage] = useState(null);

  const category = useParams();

  //redux get list of comments

  //initialize redux user
  const { currentUser, getAllUser } = bindActionCreators(
    actionUser,
    useDispatch()
  );
  const activeUser = useSelector((state) => state.user);

  //initialize redux action
  const { createPost, getAllPost, deletePost, updatePost } = bindActionCreators(
    actionPost,
    useDispatch()
  );

  const [posts, setPosts] = useState([]);

  //initialize redux list of posts

  useEffect(() => {
    setTimeout(() => {
      getAllPost().then((response) => {
        const allPosts = response.payload.filter(
          (post) => post.postCategory === category.category
        );
        setPosts(allPosts);
      });
    }, 500);
  }, [category, postWasAdded]);

  useEffect(() => {
    if (localStorage.email) {
      currentUser(localStorage.email);
    }
  }, [localStorage.email]);

  useEffect(() => {
    if (localStorage.role === "admin") {
      setShowAddButton(true);
    } else {
      if (category.category === "announcements") {
        setShowAddButton(false);
      } else {
        setShowAddButton(true);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getAllUser().then((response) => {
        setAllUser(response.payload);
        console.log(allUser);
      });
    }, 700);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // getListComments().then((response) => {
      //   setCommentList(response.payload);
      //   console.log(commentList);
      // });

      getListComments().then((response) => {
        setCommentList(response.payload);
        console.log(commentList);
      });
    }, 700);
  }, []);

  //add post action
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();

    // formData.append("file", postImage);
    setPostWasAdded(!postWasAdded);
    const newPost = {
      postTitle,
      postCategory: category.category,
      postDescription: description,
    };
    if (localStorage.email) {
      createPost(newPost, localStorage.email).then((response) => {
        if (response) {
          const responseMessage = "New post created!";
          notify(responseMessage);
        }
        setPostTitle("");
        setDescription("");
      });
    } else {
      console.log("error");
    }
  };

  //delete post action

  const removePost = (postId) => {
    setPostWasAdded(!postWasAdded);
    deletePost(postId).then((response) => {
      if (response) {
        const responseMessage = "Post deleted successfully";
        notify(responseMessage);
      }
    });
  };

  const editMode = (postId) => {
    const editPostList = posts.filter((item) => item.postId === postId);
    setGetPostId(postId);
    setEditPostTitle(editPostList[0].postTitle);
    setEditDescription(editPostList[0].postDescription);

    setEditFormInput(true);
    setShowFormInput(false);
  };

  const savePost = (e) => {
    e.preventDefault();

    const editedPost = {
      postTitle: editPostTitle,
      postDescription: editDescription,
    };

    updatePost(editedPost, getPostId).then((response) => {
      setPostWasAdded(!postWasAdded);

      if (response) {
        const responseMessage = "Post successfully updated";
        notify(responseMessage);

        setPostTitle("");
        setDescription("");
        setEditPostTitle("");
        setEditDescription("");
      }
    });
  };

  const openPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const closeInputForm = () => {
    setShowFormInput(false);
    setEditFormInput(false);
    setPostTitle("");
    setDescription("");
    setEditPostTitle("");
    setEditDescription("");
  };

  //toastify
  const notify = (responseMessage) => {
    toast.success(responseMessage, {
      theme: "dark",
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  //add image

  const addImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("yes");
      setPostImage(file);
    }
  };

  return (
    <>
      <div className="p-5 mt-5">
        <ForumHero />
        <Container>
          {showFormInput || editFormInput ? (
            " "
          ) : (
            <div className="row">
              <div className="col-md">
                {showAddButton ? (
                  <button
                    className="btn btn-primary rounded-1"
                    onClick={() => setShowFormInput(true)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faPlus} /> New Thread
                    </span>
                  </button>
                ) : (
                  <small className="text-danger">
                    ONLY ADMINS ARE ALLOWED TO CREATE AN ANNOUNCEMENT!
                  </small>
                )}
              </div>
            </div>
          )}

          {showFormInput && (
            <div className="row ">
              <div className="col-md ">
                <div className="shadow-sm border-secondary bg-white p-3">
                  <div className="p-2 form-container">
                    <Form
                      onSubmit={handleSubmit}
                      className="w-100 bg-white border-0 p-2"
                    >
                      <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Title"
                        className="mb-2 text-muted"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter title"
                          className=" rounded-0"
                          style={{ border: "1px solid #efefef" }}
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Description"
                        className="text-muted"
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          style={{
                            height: "200px",
                            border: "1px solid #efefef",
                          }}
                          className=" rounded-0 "
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FloatingLabel>
                      <div className="d-flex  mt-3 ">
                        <Button
                          variant="primary"
                          className="rounded-0 mt-2 me-2"
                          type="submit"
                        >
                          <FontAwesomeIcon icon={faEdit} /> POST
                        </Button>
                        <Button
                          variant="secondary"
                          className="rounded-0 mt-2 me-2"
                          onClick={closeInputForm}
                        >
                          <FontAwesomeIcon icon={faXmark} /> CANCEL
                        </Button>
                        <input
                          id="icon-button-file"
                          className="mt-2"
                          type="file"
                          onChange={addImage}
                        />
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {editFormInput && (
            <div className="row ">
              <div className="col-md ">
                <div className="shadow-sm border-secondary bg-white p-3">
                  <div className="p-2 form-container">
                    <Form
                      onSubmit={savePost}
                      className="w-100 bg-white border-0 p-2"
                    >
                      <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Title"
                        className="mb-2 text-muted"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter title"
                          className=" rounded-0"
                          style={{ border: "1px solid #efefef" }}
                          value={editPostTitle}
                          onChange={(e) => setEditPostTitle(e.target.value)}
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Description"
                        className="text-muted"
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          style={{
                            height: "200px",
                            border: "1px solid #efefef",
                          }}
                          className=" rounded-0 "
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </FloatingLabel>
                      <div className="d-flex justify-content-start mt-3">
                        <Button
                          variant="primary"
                          className="rounded-0 mt-2 me-2"
                          type="submit"
                        >
                          <FontAwesomeIcon icon={faEdit} /> SAVE
                        </Button>
                        <Button
                          variant="secondary"
                          className="rounded-0 mt-2"
                          onClick={closeInputForm}
                        >
                          <FontAwesomeIcon icon={faXmark} /> CANCEL
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>

        <Container className="mt-5 p-2">
          <ListGroup>
            {posts.map((data, index) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start rounded-0 post-hover"
                key={index}
              >
                <div>
                  {allUser
                    .filter((user) => user.userId === data.userId)
                    .map((item, index) => (
                      <Image
                        src={
                          item.imageLink
                            ? `http://localhost:8080/user/${data.userId}/download`
                            : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                        }
                        alt=""
                        roundedCircle
                        style={{ width: "40px", height: "38px" }}
                        key={index}
                      />
                    ))}
                </div>
                <div className="post-details ms-2 me-auto ">
                  <div className="lead d-flex position-relative">
                    <span
                      className="post-title"
                      onClick={() => openPost(data.postId)}
                    >
                      {data.postTitle}
                    </span>
                  </div>
                  {allUser
                    .filter((user) => user.userId === data.userId)
                    .map((item, index) => (
                      <span
                        className={`${
                          item.userType !== null
                            ? "user-role text-white bg-warning rounded-5 px-2 py-1"
                            : ""
                        }`}
                        key={index}
                      >
                        {item.userType}
                      </span>
                    ))}
                  <small className="d-block">
                    Posted by{" "}
                    {allUser
                      .filter((user) => user.userId === data.userId)
                      .map((item, index) => (
                        <span className="" key={index}>
                          {item.username}
                        </span>
                      ))}
                  </small>

                  <p>{data.postDescription}</p>
                </div>
                <div className="post-actions d-flex  align-items-center justify-content-center">
                  <div className="number-comments p-2">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faComment} />{" "}
                      {
                        commentList.filter(
                          (comment) => comment.postId === data.postId
                        ).length
                      }
                    </small>
                  </div>
                  {data.userId === activeUser.userId && (
                    <>
                      <div className="edit-post p-2">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">Edit post</Tooltip>
                          }
                        >
                          <small>
                            <FontAwesomeIcon
                              onClick={() => editMode(data.postId)}
                              icon={faPencil}
                            />
                          </small>
                        </OverlayTrigger>
                      </div>
                      <div className="delete-post p-2">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">Delete post</Tooltip>
                          }
                        >
                          <small>
                            <FontAwesomeIcon
                              onClick={() => removePost(data.postId)}
                              icon={faTrash}
                            />
                          </small>
                        </OverlayTrigger>
                      </div>
                    </>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
}

export default ForumListOfPosts;
