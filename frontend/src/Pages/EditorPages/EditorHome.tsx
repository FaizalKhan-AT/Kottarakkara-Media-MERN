import { AxiosResponse } from "axios";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Error from "../../Components/Error/Error";
const Footer = lazy(() => import("../../Components/Footer/Footer"));
const EditorNav = lazy(() => import("../../Components/Navbar/EditorNav"));
const FilterNav = lazy(() => import("../../Components/Navbar/FilterNav"));
const PostCard = lazy(() => import("../../Components/PostCard/PostCard"));
const VideoCard = lazy(() => import("../../Components/PostCard/VideoCard"));
import Spinner from "../../Components/Spinner/Spinner";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";
export interface Filter {
  type: string;
  time: string;
}
const EditorHome: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [posts, setPosts] = useState<News[]>([]);
  const [search, setSearch] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const checkLocalStorage = () => {
    if (!localStorage.getItem("user")) return null;
    const { id } = JSON.parse(localStorage.getItem("user") as string);
    return id;
  };
  const fetchPosts = () => {
    setLoading(true);
    let id = checkLocalStorage();
    if (id) {
      axios
        .get(`/editor/${id}`)
        .then((res) => {
          const { status, data, error } = res.data;
          switch (status) {
            case "ok":
              setPosts(data);
              setSearch(data);
              setLoading(false);
              break;
            case "error":
              setError(error);
              break;
          }
        })
        .catch((err) => setError("something went wrong!!"));
    } else {
      setError("something went wrong!!");
      return;
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSearch = (key: string) => {
    setPosts(
      search.filter((item) => {
        if (item.titleEng.includes(key.toLocaleLowerCase())) return item;
        else if (item.titleMal.includes(key.toLocaleLowerCase())) return item;
      })
    );
  };

  const handleFilter = (filter: Filter) => {
    const { type, time } = filter;
    const response = (res: AxiosResponse<any, any>) => {
      const { status, error, data } = res.data;
      switch (status) {
        case "ok":
          setPosts(data);
          setSearch(data);
          break;
        case "error":
          setError(error);
          break;
      }
    };
    let id = checkLocalStorage();
    if (id) {
      if (time !== "" && type !== "") {
        axios
          .get(`/editor/filter/${id}/${type}/${time}`)
          .then(response)
          .catch((err) => {
            setError("something went wrong :( couldn't fetch data");
          });
      }
    }
  };
  return (
    <>
      <Suspense>
        <EditorNav />
      </Suspense>
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Editor's Panel
      </div>
      <br />
      <Suspense>
        <FilterNav handleFilter={handleFilter} handleSearch={handleSearch} />
      </Suspense>
      <br />
      <div
        style={{ height: `${posts.length < 1 ? "44vh" : ""}` }}
        className="container"
      >
        <div className="d-flex gap-2 align-items-center">
          <span style={{ height: "30px", width: "4px" }} className="bar"></span>
          <span className="fw-bold text-dark h3 mb-0">Your posts</span>
        </div>
        <br />
        {loading ? (
          <Spinner height="50vh" />
        ) : (
          <>
            {posts.length > 0 ? (
              <div className="card-section">
                {posts.map((post, idx) => {
                  return post.type === "video" ? (
                    <Suspense fallback={<Spinner height="20vh" />}>
                      <VideoCard
                        fetchFn={fetchPosts}
                        editor
                        post={post}
                        key={post._id}
                      />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<Spinner height="50vh" />}>
                      <PostCard
                        fetchFn={fetchPosts}
                        editor
                        post={post}
                        key={post._id}
                      />
                    </Suspense>
                  );
                })}
              </div>
            ) : (
              <h3 className="text-center my-3">
                You haven't posted any news yet...{" "}
                <Link to="/editor/post">Post news</Link>
              </h3>
            )}
          </>
        )}
      </div>
      {error ? <Error error={error} setError={setError} /> : ""}
      <br />
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};

export default EditorHome;
