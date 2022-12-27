import React from "react";
import { News } from "../../interfaces/NewsInterface";
import ImageElement from "./ImageElement";
import "./postView.css";
import VideoElement from "./VideoElement";
type Props = {
  post: News | null;
};
const PostView: React.FC<Props> = ({ post }) => {
  return (
    <>
      {post?.type === "video" ? (
        <VideoElement post={post} />
      ) : (
        <ImageElement post={post} />
      )}
      <div className="my-3 container">
        <h3 className="fw-bold my-3 mb-4 w-100">{post?.titleMal}</h3>
        <div
          style={{ width: "80%" }}
          className="d-flex align-items-center fs-5 justify-content-between"
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
          style={{ fontSize: "18px", textTransform: "none" }}
          className="my-3"
        >
          <span className="fw-bold text-capitalize">
            {" "}
            {post?.place} &#x2726;{" "}
          </span>
          <span className="red-color fw-bold fs-3 text-capitalize">
            {post?.newsContent.charAt(0)}
          </span>
          {post?.newsContent.slice(1)}
        </div>
        <div
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
        </div>
      </div>
    </>
  );
};

export default PostView;
