import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../../Components/Error/Error";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import PostCard from "../../Components/PostCard/PostCard";
import VideoCard from "../../Components/PostCard/VideoCard";
import FilterSidebar, { NFilter } from "../../Components/Sidebar/FilterSidebar";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "../../config";
import { Search, SearchType } from "../../contexts/SearchContext";
import { News } from "../../interfaces/NewsInterface";

const NewsFilter: React.FC = () => {
  const { category, key } = useParams();
  const [error, setError] = useState<string>("");
  const { handleSearch, search } = useContext(Search) as SearchType;
  const [news, setNews] = useState<News[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        const { error, status, data } = res.data;
        switch (status) {
          case "ok":
            setNews(data);
            setLoading(false);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("couldn't get news :("));
  };
  useEffect(() => {
    setLoading(true);
    if (key !== "") {
      searchPosts();
      return;
    }
    if (category === "all") fetchData("/news/");
    else fetchData(`/filter/news/${category?.replace(" ", "-")}`);
  }, [key]);

  const handleOpen = () => setOpen(!open);
  const handleFilter = (filter: NFilter) => {
    fetchData(
      `filter/${filter.category.replace(" ", "-")}/${filter.type}/${
        filter.time
      }/${filter.place.replaceAll(" ", "-")}`
    );
  };
  const searchPosts = () => {
    setNews(handleSearch());
    setLoading(false);
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
      {loading ? (
        <Spinner height="55vh" />
      ) : (
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
      )}
      <Footer />
    </>
  );
};

export default NewsFilter;
