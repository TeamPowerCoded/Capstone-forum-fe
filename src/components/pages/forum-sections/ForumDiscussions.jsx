import React from "react";
import { Col, Container, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faGamepad,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as actionPost from "../../../redux/actions/actionPost";
import { bindActionCreators } from "redux";
import { useState } from "react";
import { useEffect } from "react";

function ForumDiscussions() {
  const [allPosts, setAllPosts] = useState([]);

  //initialize redux action
  const { getAllPost } = bindActionCreators(actionPost, useDispatch());

  useEffect(() => {
    setTimeout(() => {
      getAllPost().then((response) => {
        const allPosts = response.payload;
        setAllPosts(allPosts);
      });
    }, 500);
  }, []);

  const categoryCount = {
    announcement: allPosts.filter(
      (item) => item.postCategory === "announcements"
    ).length,
    general: allPosts.filter((item) => item.postCategory === "general").length,
    gaming: allPosts.filter((item) => item.postCategory === "gaming").length,
  };

  return (
    <section className="">
      <Container>
        <ListGroup>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center py-4"
          >
            <div className="ms-2 me-auto">
              <h5 className="fw-bold">
                <FontAwesomeIcon icon={faBullhorn} /> ANNOUNCEMENTS
              </h5>
              <small className="text-muted">
                This page contains all announcements about the community
              </small>
            </div>

            <Link
              to={`/forum/${"announcements"}`}
              className="text-decoration-none text-dark me-2"
            >
              threads
            </Link>
            <Badge bg="primary" pill>
              {categoryCount.announcement}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center py-4"
          >
            <div className="ms-2 me-auto">
              <div className="category-title">
                <h5 className="fw-bold">
                  <FontAwesomeIcon icon={faPeopleGroup} /> GENERAL
                </h5>
                <small className="text-muted">
                  Discuss anything you want about that doesn't fit other forums
                </small>
              </div>
            </div>
            <Link
              to={`/forum/${"general"}`}
              className="text-decoration-none text-dark me-2"
            >
              threads
            </Link>
            <Badge bg="primary" pill>
              {categoryCount.general}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center py-4"
          >
            <div className="ms-2 me-auto">
              <h5 className="fw-bold">
                <FontAwesomeIcon icon={faGamepad} /> GAMING
              </h5>
              <small className="text-muted">
                Engage with others and chit-chat with them anything about gaming
              </small>
            </div>
            <Link
              to={`/forum/${"gaming"}`}
              className="text-decoration-none text-dark me-2"
            >
              threads
            </Link>
            <Badge bg="primary" pill>
              {categoryCount.gaming}
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </section>
  );
}

export default ForumDiscussions;
