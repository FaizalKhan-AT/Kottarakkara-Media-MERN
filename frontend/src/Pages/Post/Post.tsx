import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Error from "../../Components/Error/Error";
import Footer from "../../Components/Footer/Footer";
import PostView from "../../Components/PostView/PostView";
import PostSeo from "../../Components/Seo/PostSeo";
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
      <PostView post={post ? post : null} />
      <PostSeo post={post as News} />
      <br />
      <br />
      <div className="container w-100">
        <CategorySection
          relatedNews={relatedNews}
          name="Related Articles"
          related
        />
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Post;
