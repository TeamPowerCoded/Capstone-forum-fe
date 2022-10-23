import React from "react";
import ForumDiscussions from "./forum-sections/ForumDiscussions";
import ForumHero from "./forum-sections/ForumHero";

function Forum() {
  return (
    <div className="p-5 mt-5">
      <ForumHero />
      <ForumDiscussions />
    </div>
  );
}

export default Forum;
