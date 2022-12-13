import React from "react";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import Slider from "../../Components/Slider/Slider";

const Home: React.FC = () => {
  return (
    <>
      <MainNav />
      <div className="container mt-5">
        <br />
        <div className="d-flex">
          <Slider />
        </div>
        <br />
        <CategorySection name="Latest News" />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Home;
