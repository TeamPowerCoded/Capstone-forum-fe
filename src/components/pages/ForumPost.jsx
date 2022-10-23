import React from "react";
import {
  Container,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPaperPlane,
  faCamera,
  faTrash,
  faPencil,
  faSave,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import ForumHero from "./forum-sections/ForumHero";
import * as actionPost from "../../redux/actions/actionPost";
import * as actionComment from "../../redux/actions/actionComment";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import * as actionUser from "../../redux/actions/actionUser";

function ForumPost() {
  const { getAllUser } = bindActionCreators(actionUser, useDispatch());
  const { getPost } = bindActionCreators(actionPost, useDispatch());
  const { addComment, getAllComments, deleteComment, updateComment } =
    bindActionCreators(actionComment, useDispatch());
  const [allUser, setAllUser] = useState([]);
  const [activePost, setActivePost] = useState({});
  const [comment, setComment] = useState("");
  const [editCom, setEditCom] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [triggerComment, setTriggerComment] = useState(false);
  const activePostId = useParams();
  const [commentId, setCommentId] = useState("");

  const [editMode, setEditMode] = useState(false);

  const activeUser = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      getPost(activePostId.id).then((response) => {
        setActivePost({
          userId: response.payload.userId,
          postTitle: response.payload.postTitle,
          postDescription: response.payload.postDescription,
          createdDate: response.payload.createdDate,
        });
      });
    }, 500);
  }, [activePostId.id]);

  useEffect(() => {
    setTimeout(() => {
      getAllComments(activePostId.id).then((response) => {
        setAllComments(response.payload);
        console.log(allComments);
      });
    }, 700);
  }, [activePostId.id, triggerComment]);

  useEffect(() => {
    setTimeout(() => {
      getAllUser().then((response) => {
        setAllUser(response.payload);
        console.log(allUser);
      });
    }, 700);
  }, [activePostId.id, triggerComment]);

  const handleSubmit = () => {
    addComment({ comment: comment }, localStorage.email, activePostId.id).then(
      (response) => {
        setTriggerComment(!triggerComment);
        setComment("");
      }
    );
  };

  const removeComment = (commentId) => {
    deleteComment(commentId).then((response) => {
      setTriggerComment(!triggerComment);
      console.log("successfully deleted!" + ": " + response.payload);
    });
  };

  const editComment = (commentId, comment) => {
    setEditMode(true);
    setCommentId(commentId);
    setEditCom(comment);
  };

  const cancelEdit = () => {
    setEditMode(false);

    setEditCom("");
  };

  const saveComment = () => {
    updateComment({ comment: editCom }, commentId).then((response) => {
      setTriggerComment(!triggerComment);
      setEditCom("");
    });
  };

  return (
    <div className="p-5 mt-5">
      <ForumHero />
      <Container>
        <div className="main-container bg-light p-3 rounded-2 shadow-sm">
          <div className="user-post-details d-flex flex-column ">
            <div className="user-post-title d-flex flex-column">
              <span className="lead">{activePost.postTitle}</span>
              {allUser
                .filter((user) => user.userId === activePost.userId)
                .map((data) => (
                  <small className="text-muted user-info">
                    <FontAwesomeIcon icon={faUser} /> {data.username}
                  </small>
                ))}
            </div>
          </div>
          <div className="post-thread-container d-flex flex-row mt-3 rounded-3 ">
            <div className="post-user-details p-4 flex flex-column text-center">
              {allUser
                .filter((user) => user.userId === activePost.userId)
                .map((data) => (
                  <img
                    src={
                      data.imageLink
                        ? `http://localhost:8080/user/${data.userId}/download`
                        : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                    }
                    alt=""
                    className="rounded-circle"
                    height="80px"
                    width="80px"
                  />
                ))}

              <span className="d-block mt-2 fw-bold">
                {allUser
                  .filter((user) => user.userId === activePost.userId)
                  .map((data) => data.username)}
              </span>

              <small className="d-block  text-success">
                {allUser
                  .filter((user) => user.userId === activePost.userId)
                  .map((data) => data.userType)}
              </small>
            </div>
            <div className="post-details-container p-4 d-flex flex-column flex-grow-1">
              <div className="post-date">
                <small className="text-muted">
                  {activePost.createdDate
                    ? new Date(activePost.createdDate).toDateString()
                    : ""}
                </small>
              </div>
              <div className="post-description mt-2">
                <p className="text-lead">{activePost.postDescription}</p>
              </div>
            </div>
          </div>
          <hr />

          {/****COMMENT SECTION */}

          {allComments.map((comment, index) => (
            <div
              className="post-thread-container d-flex flex-row mt-3 rounded-3"
              key={index}
            >
              <div className="post-user-details p-4 flex flex-column text-center">
                {allUser
                  .filter((user) => user.userId === comment.userId)
                  .map((data) => (
                    <img
                      src={
                        data.imageLink
                          ? `http://localhost:8080/user/${data.userId}/download`
                          : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                      }
                      alt=""
                      className="rounded-circle"
                      height="80px"
                      width="80px"
                    />
                  ))}

                <span className="d-block mt-2 fw-bold">
                  {allUser
                    .filter((user) => user.userId === comment.userId)
                    .map((data) => data.username)}
                </span>

                <small className="d-block text-success">
                  {allUser
                    .filter((user) => user.userId === comment.userId)
                    .map((data) => data.userType)}
                </small>
              </div>
              <div className="post-details-container p-4 d-flex flex-column flex-grow-1">
                <div className="post-date">
                  <small className="text-muted">
                    {comment.createdDate
                      ? new Date(comment.createdDate).toDateString()
                      : ""}
                  </small>
                </div>
                <div className="post-description mt-2">
                  <p className="text-lead">{comment.comment}</p>
                </div>
              </div>
              <div className="comment-actions-details p-4">
                <div className="d-flex">
                  {activeUser.userId === comment.userId && (
                    <>
                      <div className="edit-post p-2">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">Edit post</Tooltip>
                          }
                        >
                          <small
                            onClick={() =>
                              editComment(comment.commentId, comment.comment)
                            }
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </small>
                        </OverlayTrigger>
                      </div>
                      <div className="delete-post p-2">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">Delete post</Tooltip>
                          }
                        >
                          <small
                            onClick={() => removeComment(comment.commentId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </small>
                        </OverlayTrigger>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 mt-5 bg-light shadow-sm rounded-3">
          {localStorage.email && (
            <Form>
              <InputGroup>
                {editMode ? (
                  <Form.Control
                    placeholder="Write your comment..."
                    aria-label="Recipient's username with two button addons"
                    value={editCom}
                    onChange={(e) => setEditCom(e.target.value)}
                  />
                ) : (
                  <Form.Control
                    placeholder="Write your comment here..."
                    aria-label="Recipient's username with two button addons"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                )}

                {editMode ? (
                  <FontAwesomeIcon
                    icon={faSave}
                    className="comment-button p-3 text-white bg-primary"
                    onClick={saveComment}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="comment-button p-3 text-white bg-primary"
                    onClick={handleSubmit}
                  />
                )}
                {editMode && (
                  <FontAwesomeIcon
                    icon={faClose}
                    className="comment-button p-3 text-white bg-danger"
                    onClick={cancelEdit}
                  />
                )}
                <FontAwesomeIcon
                  icon={faCamera}
                  className="comment-button p-3 text-white bg-warning"
                />
              </InputGroup>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ForumPost;
