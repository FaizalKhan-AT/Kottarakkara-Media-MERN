import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import axios from "../../config";

const Live = () => {
  const [url, setUrl] = useState<string>("");
  const fetchLiveUrl = () => {
    axios
      .get("/news/live")
      .then((res) => {
        const { error, data, status } = res.data;
        switch (status) {
          case "ok":
            setUrl(data.liveUrl);
            break;
          case "error":
            break;
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchLiveUrl();
  }, []);
  return (
    <>
      <MainNav />
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Live on YouTube
      </div>
      <div className="container">
        <iframe
          width="100%"
          height="500"
          src={url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Live;
