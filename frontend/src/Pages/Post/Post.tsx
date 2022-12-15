import React from "react";
import { useParams } from "react-router-dom";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Footer from "../../Components/Footer/Footer";
import PostView from "../../Components/PostView/PostView";

const Post: React.FC = () => {
  const { id } = useParams();
  return (
    <>
      <PostView />
      <br />
      <br />
      <div className="container">
        <CategorySection name="Related Articles" related />
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Post;
