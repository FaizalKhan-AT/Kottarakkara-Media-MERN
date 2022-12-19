import React from "react";
import PostNewsForm from "../../Components/PostNews/PostNewsForm";

const AddNews: React.FC = () => {
  return (
    <>
      <div className="container">
        <div
          style={{ textDecoration: "dotted underline var(--red-color)" }}
          className="text-center h3 fw-bold my-3 mt-5"
        >
          Post news
        </div>
        <br />
        <PostNewsForm />
      </div>
    </>
  );
};

export default AddNews;
