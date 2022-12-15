import React from "react";
import PostNav from "../Navbar/PostNav";

const VideoElement: React.FC = () => {
  return (
    <>
      <div className="w-100 position-relative">
        <PostNav />
        <video
          style={{ borderRadius: "0 0 50px 50px", boxShadow: "var(--shadow)" }}
          width="100%"
          height="400"
          controlsList="nodownload"
          autoPlay
          muted
          loop
          controls
          title="this is a video"
        >
          <source
            type="video/mp4"
            src="https://player.vimeo.com/external/370467553.sd.mp4?s=96de8b923370fb7fa8616d4e0b74eaf3fac9e576&profile_id=164&oauth2_token_id=57447761"
          />
        </video>
      </div>
    </>
  );
};

export default VideoElement;
