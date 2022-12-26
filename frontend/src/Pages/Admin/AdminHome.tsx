import React, { useEffect, useState } from "react";
import EditorCard from "../../Components/Cards/EditorCards";
import Error from "../../Components/Error/Error";
import AdminFilterNav, {
  FilterAdmin,
} from "../../Components/Navbar/AdminFilterNav";
import EditorNav from "../../Components/Navbar/EditorNav";
import PostCard from "../../Components/PostCard/PostCard";
import VideoCard from "../../Components/PostCard/VideoCard";
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
  const fetchData = (url: string) => {
    setError("");
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

  const handleSearch = (search: string) => {};
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <EditorNav admin />

      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Admin Panel
      </div>
      <br />
      <AdminFilterNav
        setTitle={setTitle}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
      />
      <br />
      <div className="container">
        <div className="d-flex gap-2 align-items-center">
          <span style={{ height: "30px", width: "4px" }} className="bar"></span>
          <span className="fw-bold text-dark h3 mb-0">{title}</span>
        </div>
        <br />
        {title.includes("editors") ? (
          <div className="d-flex flex-column gap-2">
            {data.length > 0 ? (
              data?.map((editor) => {
                return (
                  <EditorCard
                    fetchFn={fetchData}
                    key={editor._id}
                    editor={editor as Editor}
                  />
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
                <VideoCard admin post={post} key={post._id} />
              ) : (
                <PostCard admin post={post} key={post._id} />
              );
            })}
          </div>
        ) : (
          <h3 className="text-center my-3">No posts since now... </h3>
        )}
      </div>
      <br />
    </>
  );
};

export default AdminHome;
