import React, { lazy, Suspense } from "react";
import Spinner from "../../Components/Spinner/Spinner";
const PostNewsForm = lazy(
  () => import("../../Components/PostNews/PostNewsForm")
);

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
        <Suspense fallback={<Spinner height="50vh" />}>
          <PostNewsForm />
        </Suspense>
      </div>
    </>
  );
};

export default AddNews;
