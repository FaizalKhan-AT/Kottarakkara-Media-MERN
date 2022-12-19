import React from "react";
import Footer from "../../Components/Footer/Footer";
import EditorNav from "../../Components/Navbar/EditorNav";
import PostCard from "../../Components/PostCard/PostCard";
import VideoCard from "../../Components/PostCard/VideoCard";

const EditorHome: React.FC = () => {
  return (
    <>
      <EditorNav />
      <br />
      <div className="container">
        <div className="d-flex gap-2 align-items-center">
          <span style={{ height: "30px", width: "4px" }} className="bar"></span>
          <span className="fw-bold text-dark h3 mb-0">Your posts</span>
        </div>
        <br />
        <div className="card-section">
          {[...Array(20)].map((_, idx) => {
            return idx % 5 === 0 ? (
              <VideoCard editor key={idx} />
            ) : (
              <PostCard editor id={idx + 1} key={idx} />
            );
          })}
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default EditorHome;
