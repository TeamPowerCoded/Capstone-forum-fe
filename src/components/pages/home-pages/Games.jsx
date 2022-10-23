import React from "react";

function Games({ name, background_img, rating }) {
  return (
    <>
      <span className="d-block mb-2">{name}</span>
      <img className="game-image " src={background_img} alt="" />
      <div className="mt-5 mx-4 p-3 position-absolute top-0 end-0">
        <span className="bg-primary text-white px-3 rounded-5">{rating}</span>
      </div>
    </>
  );
}

export default Games;
