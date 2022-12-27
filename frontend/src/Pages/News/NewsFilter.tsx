import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../../Components/Error/Error";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import PostCard from "../../Components/PostCard/PostCard";
import VideoCard from "../../Components/PostCard/VideoCard";
import FilterSidebar, { NFilter } from "../../Components/Sidebar/FilterSidebar";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";

const NewsFilter: React.FC = () => {
  const { category } = useParams();
  const [error, setError] = useState<string>("");
  const [news, setNews] = useState<News[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        const { error, status, data } = res.data;
        switch (status) {
          case "ok":
            setNews(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("couldn't get news :("));
  };
  useEffect(() => {
    if (category === "all") fetchData("/news/");
    else fetchData(`/filter/news/${category?.replace(" ", "-")}`);
  }, []);
  const handleOpen = () => setOpen(!open);
  const handleFilter = (filter: NFilter) => {
    fetchData(
      `filter/${filter.category.replace(" ", "-")}/${filter.type}/${
        filter.time
      }/${filter.place.replaceAll(" ", "-")}`
    );
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <MainNav news handleOpen={handleOpen} />
      <FilterSidebar
        handleFilter={handleFilter}
        open={open}
        handleOpen={handleOpen}
      />
      <br />
      <div className="container">
        {news.length > 0 ? (
          <div className="card-section my-3">
            {news.map((post, idx) => {
              return post.type === "video" ? (
                <VideoCard post={post} key={post._id} />
              ) : (
                <PostCard post={post} key={post._id} />
              );
            })}
          </div>
        ) : (
          <h3 className="text-center my-3">No News till now...</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsFilter;
