import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../NavigationBar";

function AboutUs() {
  return (
    <>
      <section className="about-us ">
        <div className="about-container d-flex flex-column align-items-start justify-content-center">
          <Container>
            <div className="d-flex">
              <div className="about-us-image">
                <img
                  className="img-fluid w-100"
                  src="https://www.jotform.com/uploads/Lorenz_A/220753215670047/5418681517487500533/600.png"
                  alt=""
                />
              </div>
              <div className="about-us-text d-flex flex-column align-items-start justify-content-end text-white w-50 ps-3 ">
                <h1>ABOUT US</h1>
                <p className="d-block text-muted lead">
                  PawerCoded is a multi-platform technology and lifestyle media
                  company. Built for audiences around the globe, our goal is to
                  make technology easier to understand. PowerCoded is the
                  everyday consumer`s source for technology news, reviews,
                  videos, and buying advice… A guide to finding the right
                  devices to match their needs. We have teams in New York,
                  Singapore, Area 54, Germany, Biringan, and Manila.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </section>{" "}
      <div className="our-partners">
        <Container>
          <div className="partner-title py-5">
            <h1 className="text-white">OUR TRUSTED PARTNERS</h1>
            <div className="partners-image bg-dark d-flex justify-content-evenly p-3 mt-4">
              <img className="img-fluid" width="200" src="../evos.png" alt="" />
              <img
                className="img-fluid"
                width="200"
                src="../predator.png"
                alt=""
              />
              <img
                className="img-fluid"
                width="200"
                src="../steamlogo.png"
                alt=""
              />
              <img className="img-fluid" width="200" src="../tnc.png" alt="" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default AboutUs;
