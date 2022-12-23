import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";
import Ads from "../Ads/Ads";
import Error from "../Error/Error";
import PostCard from "../PostCard/PostCard";
import VideoCard from "../PostCard/VideoCard";
import "./category.css";
type Props = {
  name: string;
  related?: boolean;
};
const CategorySection: React.FC<Props> = ({ name, related }) => {
  const [latest, setLatest] = useState<News[]>([]);
  const [error, setError] = useState<string>("");
  const fetchLatestNews = () => {
    axios
      .get("/news/latest")
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setLatest(data);
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
  useEffect(() => {
    fetchLatestNews();
  }, []);
  return (
    <>
      <div className="d-flex gap-2 align-items-center">
        <span style={{ height: "30px", width: "4px" }} className="bar"></span>
        <span className="fw-bold text-dark h3 mb-0">{name}</span>
      </div>
      {related ? (
        <div className="mt-3 card-section">
          {/* {[...Array(10)].map((_, idx) => {
            return <PostCard id={idx + 1} key={idx} />;
          })} */}
        </div>
      ) : (
        <div className="mt-3 card-section">
          {latest.length > 0
            ? latest.map((post, idx) => {
                return post.type === "video" ? (
                  <VideoCard post={post} key={post._id} />
                ) : (
                  <PostCard post={post} id={idx + 1} key={post._id} />
                );
              })
            : ""}
        </div>
      )}
      <div className="w-100 text-center my-3">
        <Link to="news/" className="btn btn-outline-danger btn-rounded">
          View More
        </Link>
      </div>
      {error ? <Error error={error} setError={setError} /> : ""}
    </>
  );
};

export default CategorySection;
