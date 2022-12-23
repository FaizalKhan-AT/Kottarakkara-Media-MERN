import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../../Components/Error/Error";
import PostNewsForm from "../../Components/PostNews/PostNewsForm";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";

const EditNews: FC = () => {
  const { id } = useParams();
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<News>();
  const fetchPost = () => {
    axios
      .get(`/news/post/${id}`)
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setPost(data);
            break;
          case "error":
            setError(error);
        }
      })
      .catch((err) => {
        setError("Something went wrong :( try again");
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
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
        <PostNewsForm data={post} />
      </div>
    </>
  );
};

export default EditNews;
