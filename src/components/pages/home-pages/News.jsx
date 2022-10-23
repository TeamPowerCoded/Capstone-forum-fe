import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import * as actionGames from "../../../redux/actions/actionGames";
import * as actionPost from "../../../redux/actions/actionPost";
import * as actionUser from "../../../redux/actions/actionUser";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Games from "./Games";
import { Link, useNavigate } from "react-router-dom";

function News() {
  const listOfGames = useSelector((state) => state.upcomingGames);
  const { getGames } = bindActionCreators(actionGames, useDispatch());
  const { getAllPost } = bindActionCreators(actionPost, useDispatch());
  const [allPosts, setAllPosts] = useState([]);
  const { getAllUser } = bindActionCreators(actionUser, useDispatch());

  const [allUser, setAllUser] = useState([]);

  const navigate = useNavigate();

  //pagination properties
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  //react pagination
  const pageCount = Math.ceil(listOfGames.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //fetch games

  const fetchGames = () => {
    axios
      .get(
        "https://rawg.io/api/games?key=1a6f3d75b83c42bf9ad135d4f3a60d0a&dates=2022-10-01,2022-10-30&platforms=18,1,7"
      )
      .then((res) => {
        getGames(res.data.results);
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getAllUser().then((response) => {
        setAllUser(response.payload);
      });
    }, 700);
  }, []);

  //fetch posts
  useEffect(() => {
    getAllPost().then((response) => {
      const listOfPosts = response.payload;
      setAllPosts(listOfPosts);
    });

    console.log(allPosts);
  }, []);

  const displayGames = listOfGames
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((games, index) => {
      return (
        <div className="col-md-4 p-3 text-white position-relative" key={index}>
          <Games
            index={index}
            name={games.name}
            background_img={
              games.background_image || games.platforms.image_background
            }
            rating={games.rating}
          />
        </div>
      );
    });

  // const openPost = (postId) => {
  //   console.log(postId);
  //   navigate(`/post/${postId}`);
  // };

  return (
    <section className="py-5 section-title home-news">
      <Container className="py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex">
              <div className="section-title pe-2 flex-grow-0 d-flex align-items-center justify-content-start py-2">
                <h3 className="fw-bold text-white">UPCOMING GAMES</h3>
              </div>
              <div className="right-bar flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="right-stick w-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          {displayGames}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
        <div className="row">
          <div className="col-md-8 p-3">
            <div className=" d-flex ">
              <div className="section-title pe-2 flex-grow-0 d-flex align-items-center justify-content-center py-2">
                <h3 className="fw-bold text-white">LATEST NEWS</h3>
              </div>
              <div className="right-bar flex-grow-1 d-flex align-items-center justify-content-center me-2">
                <div className="right-stick w-100"></div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card rounded-0">
                  <img
                    className="card-img-top"
                    src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <div className="card-body bg-dark">
                    <h5 className="card-title">NEWS 1</h5>
                    <p className="card-text text-white small">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, enim?
                    </p>
                    <small className="text-muted">08/29/2022</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0">
                  <img
                    className="card-img-top"
                    src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <div className="card-body bg-dark ">
                    <h5 className="card-title">NEWS 2</h5>
                    <p className="card-text text-white small">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eius, porro?
                    </p>
                    <small className="text-muted">09/01/2022</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0">
                  <img
                    className="card-img-top"
                    src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <div className="card-body bg-dark ">
                    <h5 className="card-title">NEWS 3</h5>
                    <p className="card-text text-white small">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam, velit?
                    </p>
                    <small className="text-muted">09/01/2022</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0">
                  <img
                    className="card-img-top"
                    src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <div className="card-body bg-dark ">
                    <h5 className="card-title">NEWS 4</h5>
                    <p className="card-text text-white small">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eius, officia!
                    </p>
                    <small className="text-muted">09/01/2022</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-3">
            <div className="d-flex">
              <div className="right-bar pe-2 flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="right-stick w-100"></div>
              </div>
              <div className="section-title pe-0 flex-grow-0 d-flex align-items-center justify-content-center py-2">
                <h3 className="fw-bold text-white">DISCUSSIONS</h3>
              </div>
              <div className="right-bar ps-2 flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="right-stick w-100"></div>
              </div>
            </div>

            <div className="d-flex flex-column">
              {allPosts.map((data, index) => (
                <div
                  className="post-container d-flex flex-row justify-content-between p-3 shadow-sm "
                  key={index}
                >
                  {allUser
                    .filter((user) => user.userId === data.userId)
                    .map((data) => (
                      <img
                        src={
                          data.imageLink
                            ? `http://localhost:8080/user/${data.userId}/download`
                            : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                        }
                        alt=""
                        className="rounded-circle mx-3"
                        height="38px"
                        width="38px"
                      />
                    ))}
                  {/* <div className="">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="h2 px-3 text-white"
                    />
                  </div> */}

                  <div className=" flex-grow-1 position-relative">
                    <span className="text-muted ">
                      {data.postTitle.length > 20
                        ? data.postTitle.substring(
                            0,
                            data.postTitle.length - 20
                          ) + "... "
                        : data.postTitle}
                    </span>
                    <small
                      className={`post-category position-absolute bottom-0 start-0 rounded-5 px-2 ${
                        data.postCategory === "announcements"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {data.postCategory}
                    </small>
                  </div>
                  <div className="">
                    <Link
                      className="d-block open-thread text-decoration-none"
                      to={`/post/${data.postId}`}
                    >
                      <small>open</small>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 p-0 "></div>
        </div>
      </Container>
    </section>
  );
}

export default News;
