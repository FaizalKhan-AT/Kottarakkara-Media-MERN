import React from "react";
import { Link } from "react-router-dom";
import Ads from "../Ads/Ads";
import PostCard from "../PostCard/PostCard";
import VideoCard from "../PostCard/VideoCard";
import "./category.css";
type Props = {
  name: string;
};
const CategorySection: React.FC<Props> = ({ name }) => {
  return (
    <>
      <div
        className="d-flex gap-2 align-items-center 
      "
      >
        <span style={{ height: "30px", width: "4px" }} className="bar"></span>
        <span className="fw-bold text-dark h3 mb-0">{name}</span>
      </div>
      <div className="mt-3 card-section">
        {[...Array(20)].map((_, idx) => {
          return idx % 5 === 0 ? (
            <VideoCard key={idx} />
          ) : (
            <PostCard key={idx} />
          );
        })}
      </div>
      <div className="w-100 text-center my-3">
        <Link to="news/" className="btn btn-outline-danger btn-rounded">
          View More
        </Link>
      </div>
    </>
  );
};

export default CategorySection;
