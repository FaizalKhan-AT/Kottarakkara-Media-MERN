import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import cover from "../../assets/Logo/coverimg.jpg";
import { Link } from "react-router-dom";
import "./slider.css";
const SliderCard: React.FC = () => {
  return (
    <>
      <div className="position-relative">
        <div className="position-relative">
          <div className="position-absolute overlay start-0 end-0 top-0 bottom-0"></div>
          <img
            style={{ objectFit: "cover" }}
            src={cover}
            width="100%"
            height="300"
            alt="trending news"
          />
        </div>
        <div
          style={{ zIndex: "10" }}
          className="position-absolute start-0 bottom-0 mx-4 ps-4 mb-5"
        >
          <Link className="scard-link h4 text-start" to="/post/">
            Title of the trending news this link can be clicked to view the news
            post
          </Link>
          <p className="text-light mt-2 card-text slider">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus,
            quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Recusandae maiores porro aut autem magnam praesentium, est illum nam
            itaque necessitatibus totam esse voluptate similique commodi
            deserunt vitae quae officia omnis?
          </p>
          <div className="d-flex gap-2 align-items-center">
            <span className="bar"></span>
            <span className="fw-bold text-light">Category</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
