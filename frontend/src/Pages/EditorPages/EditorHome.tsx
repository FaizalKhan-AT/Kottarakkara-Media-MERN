import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../Components/Error/Error";
import Footer from "../../Components/Footer/Footer";
import EditorNav from "../../Components/Navbar/EditorNav";
import PostCard from "../../Components/PostCard/PostCard";
import VideoCard from "../../Components/PostCard/VideoCard";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";

const EditorHome: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [posts, setPosts] = useState<News[]>([]);
  const fetchPosts = () => {
    if (!localStorage.getItem("user")) return;
    const { id } = JSON.parse(localStorage.getItem("user") as string);
    if (id) {
      axios
        .get(`/editor/${id}`)
        .then((res) => {
          const { status, data, error } = res.data;
          switch (status) {
            case "ok":
              setPosts(data);
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
  return (
    <>
      <EditorNav />
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Editor's Panel
      </div>
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
        {posts.length > 0 ? (
          <div className="card-section">
            {posts.map((post, idx) => {
              return post.type === "video" ? (
                <VideoCard editor post={post} key={post._id} />
              ) : (
                <PostCard editor post={post} id={idx + 1} key={post._id} />
              );
            })}
          </div>
        ) : (
          <h3 className="text-center my-3">
            You haven't posted any news yet...{" "}
            <Link to="/editor/post">Post news</Link>
          </h3>
        )}
      </div>
      {error ? <Error error={error} setError={setError} /> : ""}
      <br />
      <Footer />
    </>
  );
};

export default EditorHome;
