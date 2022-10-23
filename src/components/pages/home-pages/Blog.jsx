import React from "react";
import { Container } from "react-bootstrap";

function Blog() {
  return (
    <section className="bg-light py-5">
      <Container className=" py-5">
        <div className="row p-3 ">
          <div className="col-md-12 p-0">
            <div className="d-flex">
              <div className="section-title pe-2 flex-grow-0 d-flex align-items-center justify-content-center py-2">
                <h3 className="fw-bold text-dark">RECENT BLOG</h3>
              </div>
              <div className="right-bar flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="right-stick w-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <div className="card rounded-0">
              <img
                className="card-img-top"
                src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="card-body bg-dark">
                <h5 className="card-title">BLOG 1</h5>
                <p className="card-text text-white small">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae, enim?
                </p>
                <small className="text-muted">08/29/2022</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-0">
              <img
                className="card-img-top"
                src="https://images.pexels.com/photos/51415/pexels-photo-51415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="card-body bg-dark ">
                <h5 className="card-title">BLOG 2</h5>
                <p className="card-text text-white small">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
                  porro?
                </p>
                <small className="text-muted">09/01/2022</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-0">
              <img
                className="card-img-top"
                src="https://images.pexels.com/photos/7848989/pexels-photo-7848989.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="card-body bg-dark ">
                <h5 className="card-title">BLOG 3</h5>
                <p className="card-text text-white small">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam, velit?
                </p>
                <small className="text-muted">09/01/2022</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-0">
              <img
                className="card-img-top"
                src="https://images.pexels.com/photos/9072343/pexels-photo-9072343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="card-body bg-dark ">
                <h5 className="card-title">NEWS 4</h5>
                <p className="card-text text-white small">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
                  officia!
                </p>
                <small className="text-muted">09/01/2022</small>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Blog;
