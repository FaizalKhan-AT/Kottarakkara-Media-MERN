import React from "react";
import "swiper/css";
import { Link } from "react-router-dom";
import "./slider.css";
import { News } from "../../interfaces/NewsInterface";
import { FILE_BASE_URL } from "../../env";
const SliderCard: React.FC<{ post: News }> = ({ post }) => {
  return (
    <>
      <div className="position-relative">
        <div className="position-relative">
          <div className="position-absolute overlay start-0 end-0 top-0 bottom-0"></div>
          <img
            className="slider-img"
            style={{ objectFit: "cover" }}
            src={FILE_BASE_URL + post.file}
            width="100%"
            height="300"
            alt={post.titleEng}
          />
        </div>
        <div
          style={{ zIndex: "10" }}
          className="position-absolute no-padding start-0 bottom-0 mx-4 ps-4 mb-5"
        >
          <Link
            className="scard-link card-title h4 text-start"
            to={`/post/${post._id}`}
          >
            {post.titleMal.length > 80
              ? post.titleMal.slice(0, 80)
              : post.titleMal}
            ...
          </Link>
          <p className="text-light mt-2 card-text slider">
            {post.newsContent}
            ...
          </p>
          <div className="d-flex gap-2 align-items-center">
            <span className="bar"></span>
            <span className="fw-bold text-light">{post.category}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
