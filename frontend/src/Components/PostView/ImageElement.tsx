import React from "react";
import PostNav from "../Navbar/PostNav";

const ImageElement: React.FC = () => {
  return (
    <div className="w-100 position-relative">
      <PostNav />
      <img
        width="100%"
        height="400"
        style={{
          objectFit: "cover",
          borderRadius: "0 0 50px 50px",
          boxShadow: "var(--shadow)",
        }}
        src="https://images.unsplash.com/photo-1581196607303-95c00f31c676?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="post-title"
      />
    </div>
  );
};

export default ImageElement;
