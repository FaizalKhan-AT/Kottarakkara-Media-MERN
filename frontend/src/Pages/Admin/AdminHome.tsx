import React, { lazy, useEffect, useState, Suspense } from "react";
import Error from "../../Components/Error/Error";
const EditorCard = lazy(() => import("../../Components/Cards/EditorCards"));
const UpdateLiveModal = lazy(
  () => import("../../Components/Modals/UpdateLiveModal")
);
import { FilterAdmin } from "../../Components/Navbar/AdminFilterNav";
const AdminFilterNav = lazy(
  () => import("../../Components/Navbar/AdminFilterNav")
);
const EditorNav = lazy(() => import("../../Components/Navbar/EditorNav"));
const PostCard = lazy(() => import("../../Components/PostCard/PostCard"));
const VideoCard = lazy(() => import("../../Components/PostCard/VideoCard"));
import Spinner from "../../Components/Spinner/Spinner";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";
import { Editor } from "../../interfaces/userInterface";

const AdminHome: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Editor[]>([]);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [tempNewsData, setTempNewsData] = useState<News[]>([]);
  const [tempData, setTempData] = useState<Editor[]>([]);
  const [title, setTitle] = useState<string>("all editors");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = (url: string) => {
    setError("");
    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        const { error, status, data } = res.data;
        switch (status) {
          case "ok":
            if (url.includes("editor")) {
              setData(data);
              setTempData(data);
              setNewsData([]);
              setTempNewsData([]);
            } else {
              setNewsData(data);
              setTempNewsData(data);
              setData([]);
              setTempData([]);
            }
            setLoading(false);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("something went wrong while fetching data..."));
  };
  useEffect(() => {
    fetchData("/admin/editor");
  }, []);
  const handleFilter = (filter: FilterAdmin) => {
    if (filter.category.includes("editors")) {
      fetchData(`/admin/filter/${filter.category.replace(" ", "-")}`);
    } else
      fetchData(
        `/admin/filter/${filter.category.replace(
          " ",
          "-"
        )}/${filter.type.replace(" ", "-")}/${
          !filter.type.includes("most") ? filter.time : ""
        }`
      );
  };

  const handleSearch = (search: string) => {
    if (data.length > 0) {
      setData(
        tempData.filter((item) => {
          if (item.username.toLowerCase().includes(search.toLowerCase()))
            return item;
          if (item.email.toLowerCase().includes(search.toLowerCase()))
            return item;
        })
      );
    } else if (newsData.length > 0) {
      setNewsData(
        tempNewsData.filter((item) => {
          if (item.titleEng.toLowerCase().includes(search.toLowerCase()))
            return item;
          if (item.titleMal.toLowerCase().includes(search.toLowerCase()))
            return item;
          if (item.author.toLowerCase().includes(search.toLowerCase()))
            return item;
        })
      );
    }
  };
  const handleOpen = () => setOpen(!open);
  const updateLive = (data: any) => {
    if (!data.url.includes("youtube.com/")) {
      handleOpen();
      setError("not an youtube url");
      return;
    }
    const [_, id] = data.url.split("https://www.youtube.com/watch?v=");
    if (!id) {
      handleOpen();
      setError("no video id present");
      return;
    }
    axios
      .post(`/news/live`, { url: `https://www.youtube.com/embed/${id}` })
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            handleOpen();
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("something went wrong :("));
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <Suspense>
        <EditorNav admin />
      </Suspense>
      <Suspense>
        <UpdateLiveModal
          open={open}
          handleOpen={handleOpen}
          updateFn={updateLive}
        />
      </Suspense>
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Admin Panel
      </div>
      <br />
      <Suspense>
        <AdminFilterNav
          setTitle={setTitle}
          handleFilter={handleFilter}
          handleSearch={handleSearch}
        />
      </Suspense>
      <br />
      <div className="container">
        <div onClick={handleOpen} className="btn btn-outline-danger mb-2">
          Update Live
        </div>
        <div className="d-flex gap-2 align-items-center mt-2">
          <span style={{ height: "30px", width: "4px" }} className="bar"></span>
          <span className="fw-bold text-dark h3 mb-0 ">{title}</span>
        </div>
        <br />
        {loading ? (
          <Spinner height="50vh" />
        ) : (
          <>
            {title.includes("editors") ? (
              <div className="d-flex flex-column gap-2">
                {data.length > 0 ? (
                  data?.map((editor) => {
                    return (
                      <Suspense>
                        <EditorCard
                          fetchFn={fetchData}
                          key={editor._id}
                          editor={editor as Editor}
                        />
                      </Suspense>
                    );
                  })
                ) : (
                  <h3 className="text-center my-3">
                    No editors added since now...
                  </h3>
                )}
              </div>
            ) : newsData.length > 0 ? (
              <div className="card-section">
                {newsData.map((post, idx) => {
                  return post.type === "video" ? (
                    <Suspense>
                      <VideoCard admin post={post} key={post._id} />
                    </Suspense>
                  ) : (
                    <Suspense>
                      <PostCard admin post={post} key={post._id} />
                    </Suspense>
                  );
                })}
              </div>
            ) : (
              <h3 className="text-center my-3">No posts since now... </h3>
            )}
          </>
        )}
      </div>
      <br />
    </>
  );
};

export default AdminHome;
