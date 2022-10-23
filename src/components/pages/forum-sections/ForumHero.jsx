import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { Container } from "react-bootstrap";

function ForumHero() {
  return (
    <section className="forum-hero p-5">
      <Container>
        <div className="forum-hero-container">
          <div className="hero-overlay d-flex flex-row p-5 justify-content-between align-content-center">
            <div>
              <h4 className="text-white">DISCUSSIONS</h4>
              <small className="text-secondary">
                Start a new post and interact with other weebs
              </small>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ForumHero;
