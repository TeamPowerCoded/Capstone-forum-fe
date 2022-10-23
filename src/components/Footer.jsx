import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <footer className="bg-dark text-center text-white">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <Link
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>

            <Link
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>

            <Link
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </Link>

            <Link
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <span className="text-white"> PAWERCODED</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
