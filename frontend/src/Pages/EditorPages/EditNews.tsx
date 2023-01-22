import { FC, useState } from "react";
import Error from "../../Components/Error/Error";
import PostNewsForm from "../../Components/PostNews/PostNewsForm";
import { News } from "../../interfaces/NewsInterface";

const EditNews: FC = () => {
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<News>();
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}

      <div className="container">
        <div
          style={{ textDecoration: "dotted underline var(--red-color)" }}
          className="text-center h3 fw-bold my-3 mt-5"
        >
          Edit news
        </div>
        <br />
        <PostNewsForm edit />
      </div>
    </>
  );
};

export default EditNews;
