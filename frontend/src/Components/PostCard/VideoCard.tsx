import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config";
import { Post, PostType } from "../../contexts/PostContext";
import { FILE_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import { formatNumber } from "../../usefulFunctions/formatNumber";
import Error from "../Error/Error";
import DeleteModal from "../Modals/DeleteModal";
import ShareModal from "../Modals/ShareModal";
import "./card.css";
interface Props {
  editor?: boolean;
  post: News;
  fetchFn?: () => void;
}
const VideoCard: React.FC<Props> = ({ editor, post, fetchFn }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleOpenModal = () => setOpen(!open);
  const { setPost } = useContext(Post) as PostType;
  const navigate = useNavigate();
  const [delModalOpen, setDelModalOpen] = useState<boolean>(false);
  const handleDeleteModal = () => setDelModalOpen(!delModalOpen);
  const handlePostDelete = () => {
    axios
      .delete(`/news/post/${post._id}`)
      .then((res) => {
        const { status, error } = res.data;
        switch (status) {
          case "ok":
            handleDeleteModal();
            fetchFn?.();
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => {
        setError("somewent wrong :( while deleting");
        handleDeleteModal();
      });
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <ShareModal open={open} handleOpen={handleOpenModal} />
      <DeleteModal
        open={delModalOpen}
        deleteFn={handlePostDelete}
        handleOpen={handleDeleteModal}
        data={post?.titleMal}
      />
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
            {post.titleMal.length > 60
              ? post.titleMal.split(post.titleMal.charAt(60))[0]
              : post.titleMal}
            ...
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
                <span className="">{formatNumber(post.likes)} Likes</span>
              </div>
              <div className="d-flex align-items-center gap-1 ">
                <span className="material-symbols-rounded ">visibility</span>
                <span>{formatNumber(post.views)} views</span>
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
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setPost(post);
                      navigate(`/editor/edit/`);
                    }}
                    className="btn btn-outline-primary btn-rounded"
                  >
                    Edit
                  </div>
                  <div
                    style={{ fontSize: "13px" }}
                    className="btn btn-outline-danger btn-rounded"
                    onClick={handleDeleteModal}
                  >
                    delete
                  </div>
                </div>
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
