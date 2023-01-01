import React, { useEffect, useState } from "react";
import Error from "../../Components/Error/Error";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import Title from "../../Components/Seo/Title";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "../../config";

const Live = () => {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchLiveUrl = () => {
    axios
      .get("/news/live")
      .then((res) => {
        const { error, data, status } = res.data;
        switch (status) {
          case "ok":
            setUrl(data.liveUrl);
            setLoading(false);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) =>
        setError("something went wrong :( while fetching the live")
      );
  };
  useEffect(() => {
    setLoading(true);
    fetchLiveUrl();
  }, []);
  return (
    <>
      {/* <Title /> */}

      <MainNav />
      {error ? <Error error={error} setError={setError} /> : ""}
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Live on YouTube
      </div>
      <div className="container">
        {loading ? (
          <Spinner height="50vh" />
        ) : (
          <iframe
            width="100%"
            height="500"
            src={url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Live;
