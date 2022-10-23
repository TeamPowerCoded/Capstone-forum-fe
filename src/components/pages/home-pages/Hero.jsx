import React from "react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="container h-100 d-flex flex-column align-content-center justify-content-center">
          <div className=".hero-main">
            <h1 className="hero-main-title fw-bold">
              UNITE WITH US AND PAWER UP YOUR GAME
            </h1>
            <h4 className="text-white">
              Be <span className="color-text-secondary">updated</span>. Be part
              of our <span className="color-text-secondary">community</span>
            </h4>
          </div>
          <div className="hero-button">
            {localStorage.email && (
              <button className="btn custom-btn join-btn rounded-0 mt-4">
                <span>JOIN OUR COMMUNITY</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
