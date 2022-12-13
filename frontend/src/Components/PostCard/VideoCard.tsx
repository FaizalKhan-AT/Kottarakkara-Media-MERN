import React, { useState } from "react";
import ShareModal from "../Modals/ShareModal";
import "./card.css";

const VideoCard: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => setOpen(!open);
  return (
    <>
      <ShareModal open={open} handleOpen={handleOpenModal} />
      <div className="card-vid card">
        <div className="position-realtive">
          <div
            style={{ zIndex: "10" }}
            className="d-flex gap-2 m-3 align-items-center position-absolute "
          >
            <span className="bar"></span>
            <span style={{ fontWeight: "500" }} className="text-light">
              Category
            </span>
          </div>
          <video
            className="video-card"
            width="100%"
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
        <div className="card-body my-0 py-1">
          <span className="h5 text-limit">
            Title of the video can be shown here And other details
          </span>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center">
                <span
                  onClick={() => setLiked(!liked)}
                  className={`${
                    liked ? "text-danger vid-like" : "text-dark"
                  } material-symbols-outlined mt-1 mx-1 `}
                >
                  favorite
                </span>
                <span className="">1.3K Likes</span>
              </div>
              <div className="d-flex align-items-center gap-1 ">
                <span className="material-symbols-rounded ">visibility</span>
                <span>100K views</span>
              </div>
              <span
                onClick={handleOpenModal}
                className="material-symbols-outlined text-dark"
              >
                share
              </span>
            </div>

            <span
              style={{ fontSize: "13px" }}
              className="btn btn-outline-danger btn-rounded"
            >
              Watch Now
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
