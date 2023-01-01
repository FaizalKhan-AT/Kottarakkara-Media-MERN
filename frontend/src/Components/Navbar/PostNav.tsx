import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import { formatNumber } from "../../usefulFunctions/formatNumber";
import { likePost } from "../../usefulFunctions/likePost";
import Error from "../Error/Error";
import ShareModal from "../Modals/ShareModal";
import "./NavStyles.css";
const PostNav: React.FC<{ post: News | null }> = ({ post }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleOpenModal = () => setOpen(!open);
  const navigate = useNavigate();

  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <ShareModal
        url={
          FRONTEND_BASE_URL +
          `/${post?.category.replace(" ", "-")}/${post?.titleEng.replaceAll(
            " ",
            "-"
          )}/${post?._id}`
        }
        open={open}
        handleOpen={handleOpenModal}
      />
      <div
        style={{ zIndex: "21" }}
        className="w-100 post-nav top-0 position-absolute d-flex justify-content-between align-items-center gap-3 px-3"
      >
        <div className="d-flex align-items-center gap-3">
          <div
            onClick={() => navigate("/news/all")}
            className="btn btn-glass d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined text-light me-1">
              arrow_back_ios_new
            </span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span style={{ height: "30px" }} className="bar"></span>
            <span style={{ fontWeight: "500" }} className="text-light fs-5">
              {post?.category}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3 text-light">
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
