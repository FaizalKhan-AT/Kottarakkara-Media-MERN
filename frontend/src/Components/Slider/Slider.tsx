import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";
import SliderCard from "./SliderCard";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";
import Error from "../Error/Error";
const Slider: React.FC = () => {
  const [trending, setTrending] = useState<News[]>([]);
  const [error, setError] = useState<string>("");
  const fetchTrending = () => {
    axios
      .get("/news/trending")
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setTrending(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("something went wrong :("));
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}

      {trending.length > 0 ? (
        <Swiper
          loop={true}
          navigation={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {trending.map((post, idx) => {
            return (
              <SwiperSlide key={post._id}>
                <SliderCard post={post} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        ""
      )}
    </>
  );
};

export default Slider;
