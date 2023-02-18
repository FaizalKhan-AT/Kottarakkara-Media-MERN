import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
const CategorySection = lazy(
  () => import("../../Components/CategorySection/CategorySection")
);
import Error from "../../Components/Error/Error";
import Spinner from "../../Components/Spinner/Spinner";
const Footer = lazy(() => import("../../Components/Footer/Footer"));
const PostView = lazy(() => import("../../Components/PostView/PostView"));
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<News>();
  const [error, setError] = useState<string>("");
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const fetchRelatedNews = (category: string, id: string) => {
    axios
      .get(`/news/related/${category}/${id}`)
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setRelatedNews(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => {
        setError("Something went wrong :( try refreshing the page");
      });
  };
  const fetchPost = () => {
    axios
      .get(`/news/post/${id}`)
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setPost(data);
            fetchRelatedNews(data.category.replace(" ", "-"), data._id);
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
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <Suspense fallback={<Spinner />}>
        <PostView post={post ? post : null} />
      </Suspense>
      <br />
      <br />
      <div className="container w-100">
        <Suspense fallback={<Spinner />}>
          <CategorySection
            relatedNews={relatedNews}
            name="Related Articles"
            related
          />
        </Suspense>
      </div>
      <br />
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};

export default Post;
