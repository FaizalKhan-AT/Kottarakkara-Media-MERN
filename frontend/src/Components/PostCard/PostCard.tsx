import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config";
import { PostType, Post } from "../../contexts/PostContext";
import { FILE_BASE_URL, FRONTEND_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import { formatNumber } from "../../usefulFunctions/formatNumber";
import { likePost } from "../../usefulFunctions/likePost";
import Error from "../Error/Error";
import DeleteModal from "../Modals/DeleteModal";
import ShareModal from "../Modals/ShareModal";
import Success from "../Success/Success";
import "./card.css";
interface Props {
  editor?: boolean;
  admin?: boolean;
  post: News;
  fetchFn?: () => void;
}
const PostCard: React.FC<Props> = ({ editor, post, fetchFn, admin }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const { setPost } = useContext(Post) as PostType;
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [delModalOpen, setDelModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleDeleteModal = () => setDelModalOpen(!delModalOpen);
  const handleOpenModal = () => setOpen(!open);
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
        setError("something went wrong :( while deleting");
        handleDeleteModal();
      });
  };
  const handlePatch = (endPoint: string) => {
    setSuccess("");
    setError("");
    axios
      .patch(`/admin/${endPoint}/${post._id}`)
      .then((res) => {
        const { error, data, status } = res.data;
        switch (status) {
          case "ok":
            setSuccess(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("something went wrong :( while processing"));
  };
  return (
    <>
      {success ? <Success success={success} setSuccess={setSuccess} /> : ""}
      {error ? <Error error={error} setError={setError} /> : ""}
      <ShareModal
        url={
          FRONTEND_BASE_URL +
          `/${post?.category.replace(" ", "-")}/${post.titleEng.replaceAll(
            " ",
            "-"
          )}/${post._id}`
        }
        open={open}
        handleOpen={handleOpenModal}
      />
      <DeleteModal
        open={delModalOpen}
        deleteFn={handlePostDelete}
        handleOpen={handleDeleteModal}
        data={post?.titleMal}
      />
      <div className={`card mb-1`}>
        <div className="position-relative">
          <div
            style={{ zIndex: "18" }}
            className="overlay post position-absolute start-0 end-0 top-0 bottom-0"
          ></div>
          <div
            style={{ zIndex: "19" }}
            className="w-100 d-flex mt-2 position-absolute align-items-center justify-content-between px-3"
          >
            <span
              onClick={() => {
                setLiked(!liked);
                if (!liked) {
                  likePost(post._id as string, setError);
                  post.likes++;
                }
              }}
              className="btn- d-flex align-items-center justify-content-center"
            >
              <div className="d-flex align-items-center">
                <span
                  className={`${
                    liked ? "liked text-danger" : "text-light like"
                  } material-symbols-outlined mt-1 mx-1`}
                >
                  favorite
                </span>
                <span className="text-light">
                  {formatNumber(post.likes)} Likes
                </span>
              </div>
            </span>
            <div className="position-realtive">
              <span className="btn- d-flex align-items-center justify-content-center">
                <span
                  onClick={handleOpenModal}
                  className="material-symbols-outlined share text-light"
                >
                  share
                </span>
              </span>
            </div>
          </div>
          <div
            style={{ zIndex: "19" }}
            className="w-100 bottom-0 mb-2 d-flex mt-2 position-absolute align-items-center justify-content-between px-3"
          >
            <div className="d-flex gap-2 align-items-center">
              <span className="bar"></span>
              <span style={{ fontWeight: "500" }} className="text-light">
                {post.category}
              </span>
            </div>
          </div>
          <img
            src={FILE_BASE_URL + post.file}
            width="100%"
            loading="lazy"
            height={150}
            style={{ objectFit: "cover" }}
            className="card-img-top"
            alt={post.titleEng}
          />
        </div>

        <div className="card-body px-2 d-flex flex-column justify-content-between">
          <Link
            to={`/${post.category.replace(" ", "-")}/${post.titleEng.replaceAll(
              " ",
              "-"
            )}/${post._id}`}
            className="card-title fw-bold text-dark w-100"
          >
            {post.titleMal}
          </Link>
          {editor ? (
            <span
              className={`fw-bold ${
                post.published ? "text-success" : "text-danger"
              }`}
            >
              {post.published ? "published" : "not published"}
            </span>
          ) : (
            ""
          )}
          {admin ? (
            <span
              className={`fw-bold ${
                post.published ? "text-success" : "text-danger"
              }`}
            >
              {post.published ? "published" : "not published"}
            </span>
          ) : (
            ""
          )}
          <div className="d-flex align-items-center justify-content-between by-line my-1">
            <span>{post.postedAt}</span>
            <span className="fw-bold">@{post.author}</span>
          </div>

          <p className="card-text mt-2">{post.newsContent}</p>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center gap-1 ">
              <span className="material-symbols-rounded eye">visibility</span>
              <span>{formatNumber(post.views)} views</span>
            </div>

            {editor ? (
              <div className="d-flex align-items-center gap-2 ">
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
            ) : admin ? (
              <div className="d-flex align-items-center gap-2">
                <div
                  onClick={() =>
                    handlePatch(post.published ? "unpublish" : "publish")
                  }
                  style={{ fontSize: "13px" }}
                  className={`btn ${
                    post.published
                      ? "btn-outline-secondary"
                      : "btn-outline-success"
                  } btn-rounded`}
                >
                  {post.published ? "un publish" : "publish"}
                </div>
                <div
                  className="btn btn-outline-danger btn-rounded d-flex align-items-center justify-content-center"
                  onClick={handleDeleteModal}
                >
                  <span
                    style={{ fontSize: "20px" }}
                    className="material-symbols-outlined"
                  >
                    delete
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{ fontSize: "13px" }}
                onClick={() =>
                  navigate(
                    `/${post.category.replace(
                      " ",
                      "-"
                    )}/${post.titleEng.replaceAll(" ", "-")}/${post._id}`
                  )
                }
                className="btn btn-outline-danger btn-rounded"
              >
                Read more
              </div>
            )}
          </div>
          {admin && post.published ? (
            <div
              onClick={() =>
                handlePatch(post.trending ? "remove-trending" : "trending")
              }
              style={{ fontSize: "15px" }}
              className="btn btn-outline-dark btn-rounded w-100 mt-2"
            >
              {post.trending ? "remove trending" : "set Trending"}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
