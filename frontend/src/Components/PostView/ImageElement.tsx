import React from "react";
import { FILE_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import PostNav from "../Navbar/PostNav";

const ImageElement: React.FC<{ post: News | null }> = ({ post }) => {
  return (
    <div className="w-100 position-relative">
      <PostNav post={post} />
      <img
        width="100%"
        height="400"
        style={{
          objectFit: "cover",
          borderRadius: "0 0 50px 50px",
          boxShadow: "var(--shadow)",
        }}
        src={FILE_BASE_URL + post?.file}
        alt={post?.titleEng}
      />
    </div>
  );
};

export default ImageElement;
