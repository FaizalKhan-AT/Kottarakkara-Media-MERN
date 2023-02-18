import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../Components/Error/Error";
import { NFilter } from "../../Components/Sidebar/FilterSidebar";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "../../config";
import { Search, SearchType } from "../../contexts/SearchContext";
import { News } from "../../interfaces/NewsInterface";

const Footer = lazy(() => import("../../Components/Footer/Footer"));
const MainNav = lazy(() => import("../../Components/Navbar/MainNav"));
const PostCard = lazy(() => import("../../Components/PostCard/PostCard"));
const VideoCard = lazy(() => import("../../Components/PostCard/VideoCard"));
const FilterSidebar = lazy(
  () => import("../../Components/Sidebar/FilterSidebar")
);
const NewsFilter: React.FC = () => {
  const { category, key } = useParams();
  const [error, setError] = useState<string>("");
  const { handleSearch, search, setSearch } = useContext(Search) as SearchType;
  const [news, setNews] = useState<News[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
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
    if (category === "all") fetchData("/news/");
    else fetchData(`/filter/news/${category?.replace(" ", "-")}`);
  }, []);
  useEffect(() => {
    setLoading(true);
    if (key !== "") {
      searchPosts();
      return;
    }
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
  const handleChange = (e: React.FormEvent) => {
    const tar = e.target as HTMLInputElement;
    if (tar.value === "") {
      navigate("/news/all");
    }
    setSearch(tar.value);
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <Suspense>
        <MainNav news handleOpen={handleOpen} />
      </Suspense>
      <Suspense fallback={<Spinner height="50vh" />}>
        <FilterSidebar
          handleFilter={handleFilter}
          open={open}
          handleOpen={handleOpen}
        />
      </Suspense>
      <br />
      <div className="d-flex container w-100 justify-content-center">
        <div className="d-flex search-news align-items-center gap-2">
          <input
            value={search}
            name="search"
            onChange={handleChange}
            placeholder="search"
            type="search"
            className="form-control"
          />
          <div
            onClick={() => navigate(`/news/all/${search}`)}
            className="btn btn-dark d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-rounded search">search</span>
          </div>
        </div>
      </div>
      <br />
      {loading ? (
        <Spinner height="55vh" />
      ) : (
        <div className="container">
          {news.length > 0 ? (
            <div className="card-section my-3">
              {news.map((post, idx) => {
                return post.type === "video" ? (
                  <Suspense>
                    <VideoCard post={post} key={post._id} />
                  </Suspense>
                ) : (
                  <Suspense>
                    <PostCard post={post} key={post._id} />
                  </Suspense>
                );
              })}
            </div>
          ) : (
            <h3 style={{ height: "50vh" }} className="text-center my-3">
              No News till now...
            </h3>
          )}
        </div>
      )}
      <br />
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};

export default NewsFilter;
