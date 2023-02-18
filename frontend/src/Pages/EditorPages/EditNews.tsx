import { FC, useState, lazy, Suspense } from "react";
import Error from "../../Components/Error/Error";
import Spinner from "../../Components/Spinner/Spinner";
const PostNewsForm = lazy(
  () => import("../../Components/PostNews/PostNewsForm")
);
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
        <Suspense fallback={<Spinner height="50vh" />}>
          <PostNewsForm edit />
        </Suspense>
      </div>
    </>
  );
};

export default EditNews;
