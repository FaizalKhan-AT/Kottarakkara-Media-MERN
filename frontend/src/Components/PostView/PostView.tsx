import React, { useState } from "react";
import { FRONTEND_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import { formatNumber } from "../../usefulFunctions/formatNumber";
import { likePost } from "../../usefulFunctions/likePost";
import Error from "../Error/Error";
import ShareModal from "../Modals/ShareModal";
import ImageElement from "./ImageElement";
import "./postView.css";
import VideoElement from "./VideoElement";
type Props = {
  post: News | null;
};
const PostView: React.FC<Props> = ({ post }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleOpenModal = () => setOpen(!open);

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
      {post?.type === "video" ? (
        <VideoElement post={post} />
      ) : (
        <ImageElement post={post} />
      )}
      <div className="my-3 container w-100">
        <div className="fs-3 fw-bold my-3 mb-4 w-100 title-news">
          {post?.titleMal}
        </div>
        <div
          style={{ width: "80%" }}
          className="d-flex align-items-center flex-wrap-reverse gap-3 fs-5 justify-content-between"
        >
          <span className="d-flex align-items-center gap-2 fw-bold">
            <span className="material-symbols-outlined red-color fs-2">
              calendar_month
            </span>
            <span className="byline-underline">{post?.postedAt}</span>
          </span>
          <span className="fw-bold d-flex align-items-center gap-2 ">
            <span className="material-symbols-outlined fs-2 red-color">
              account_circle
            </span>
            <span className="byline-underline">{post?.author}</span>
          </span>
        </div>
        <div
          style={{ fontSize: "18px", fontWeight: "500", textTransform: "none" }}
          className="my-3 text-justify"
        >
          <span className="fw-bold text-capitalize fs-4 ">
            {" "}
            {post?.place} &#x2726;{" "}
          </span>
          <span className="red-color fw-bold fs-3 text-capitalize">
            {post?.newsContent.charAt(0)}
          </span>
          {post?.newsContent.slice(1)}
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="d-flex align-items-center">
            <span
              onClick={() => {
                setLiked(!liked);
                if (!liked) {
                  likePost(post?._id as string, setError);
                }
              }}
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
          <div className="d-flex align-items-center  gap-1">
            <span className="material-symbols-rounded fs-2">visibility</span>
            <span>{formatNumber(post?.views as number)} views</span>
          </div>
          <div>
            <span className="ms-2 d-flex gap-2 pointer me-4 align-items-center justify-content-center">
              <span
                onClick={handleOpenModal}
                className="material-symbols-outlined fs-2  "
              >
                share
              </span>
              <span>Share</span>
            </span>
          </div>
        </div>
        <br />
        {/* <div
        style={{ width: "80%" }}
        className="d-flex flex-wrap align-items-center gap-2"
      >
        {(post?.tags.length as number) > 0
          ? post?.tags.map((tag, idx) => {
              return (
                <div
                  key={idx + tag}
                  className="chip px-3 d-flex align-items-center justify-content-between py-2 px-2 gap-2"
                >
                  <span>{tag}</span>
                </div>
              );
            })
          : ""}
      </div> */}
      </div>
    </>
  );
};

export default PostView;
