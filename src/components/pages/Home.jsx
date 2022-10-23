import React from "react";
import Footer from "../Footer";
import Blog from "./home-pages/Blog";
import Hero from "./home-pages/Hero";
import News from "./home-pages/News";

function Home() {
  return (
    <>
      <Hero />
      <News />
      <Blog />
      <Footer />
    </>
  );
}

export default Home;
