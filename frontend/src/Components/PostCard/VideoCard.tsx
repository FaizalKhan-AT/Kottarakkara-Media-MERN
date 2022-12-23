import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FILE_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import ShareModal from "../Modals/ShareModal";
import "./card.css";
interface Props {
  editor?: boolean;
  post: News;
}
const VideoCard: React.FC<Props> = ({ editor, post }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => setOpen(!open);
  const navigate = useNavigate();
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
              {post.category}
            </span>
          </div>
          <video
            className="video-card"
            width="100%"
            controlsList="nodownload"
            muted
            loop
            controls
            title={post.titleEng}
          >
            <source type={post.format} src={FILE_BASE_URL + post.file} />
          </video>
        </div>
        <div className="card-body my-0 py-1">
          <Link
            to={`/post/${post._id}`}
            className="card-title fw-bold text-dark w-100"
          >
            {post.titleMal.split(post.titleMal.charAt(60))[0]}...
          </Link>

          <div className="d-flex align-items-center my-2 justify-content-between mt-2">
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
                <span className="">{post.likes} Likes</span>
              </div>
              <div className="d-flex align-items-center gap-1 ">
                <span className="material-symbols-rounded ">visibility</span>
                <span>{post.views} views</span>
              </div>
              <span
                onClick={handleOpenModal}
                className="material-symbols-outlined text-dark"
              >
                share
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              {editor ? (
                <span
                  style={{ fontSize: "13px" }}
                  className="btn btn-outline-danger btn-rounded"
                  onClick={() => navigate("/editor/edit")}
                >
                  Edit
                </span>
              ) : (
                <span
                  style={{ fontSize: "13px" }}
                  className="btn btn-outline-danger btn-rounded"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  Watch Now
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
