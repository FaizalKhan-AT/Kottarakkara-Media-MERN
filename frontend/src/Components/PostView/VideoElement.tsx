import React from "react";
import { FILE_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import PostNav from "../Navbar/PostNav";

const VideoElement: React.FC<{ post: News }> = ({ post }) => {
  return (
    <>
      <div className="w-100 position-relative">
        <PostNav post={post} />
        <video
          style={{ borderRadius: "0 0 50px 50px", boxShadow: "var(--shadow)" }}
          width="100%"
          height="400"
          controlsList="nodownload"
          autoPlay
          muted
          loop
          controls
          title={post.titleEng}
        >
          <source type={post.format} src={FILE_BASE_URL + post.file} />
        </video>
      </div>
    </>
  );
};

export default VideoElement;
