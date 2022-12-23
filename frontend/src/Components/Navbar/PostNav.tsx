import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { News } from "../../interfaces/NewsInterface";
import { formatNumber } from "../../usefulFunctions/formatNumber";
import ShareModal from "../Modals/ShareModal";
import "./NavStyles.css";
const PostNav: React.FC<{ post: News | null }> = ({ post }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const handleOpenModal = () => setOpen(!open);
  const navigate = useNavigate();

  return (
    <>
      <ShareModal open={open} handleOpen={handleOpenModal} />
      <div
        style={{ zIndex: "21" }}
        className="w-100 post-nav top-0  d-flex justify-content-between position-absolute align-items-center gap-3 px-3"
      >
        <div className="d-flex align-items-center gap-3">
          <div
            onClick={() => navigate("/news")}
            className="btn btn-glass d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined text-light me-1">
              arrow_back_ios_new
            </span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span style={{ height: "35px" }} className="bar"></span>
            <span style={{ fontWeight: "500" }} className="text-light fs-4">
              {post?.category}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 text-light">
          <div className="d-flex align-items-center">
            <span
              onClick={() => setLiked(!liked)}
              className={`${
                liked ? "text-danger vid-like" : ""
              }  material-symbols-outlined mt-1 mx-1 pointer fs-2`}
            >
              favorite
            </span>
            <span className="">
              {formatNumber(post?.likes as number)} Likes
            </span>
          </div>
          <div className="d-flex align-items-center gap-1 ">
            <span className="material-symbols-rounded eye fs-2">
              visibility
            </span>
            <span>{formatNumber(post?.views as number)} views</span>
          </div>
          <div>
            <span className="ms-2 d-flex pointer me-4 align-items-center justify-content-center">
              <span
                onClick={handleOpenModal}
                className="material-symbols-outlined fs-2 share text-light"
              >
                share
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostNav;
