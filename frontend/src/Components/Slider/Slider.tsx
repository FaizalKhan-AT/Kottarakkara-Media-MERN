import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";
import SliderCard from "./SliderCard";
const Slider: React.FC = () => {
  return (
    <Swiper
      loop={true}
      navigation={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
    >
      {[...Array(5)].map((_, idx) => {
        return (
          <SwiperSlide key={idx}>
            <SliderCard />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
