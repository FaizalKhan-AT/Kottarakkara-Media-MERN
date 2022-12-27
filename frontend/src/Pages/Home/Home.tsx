import React, { useEffect } from "react";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import Slider from "../../Components/Slider/Slider";

const Home: React.FC = () => {
  useEffect(() => {
    const head = document.querySelector("head") as HTMLHeadElement;
    head.innerHTML = `${head.innerHTML} <title>
      Kottarakara News | Get updated quickly with latest news and events from
      Kerala | Kottarakkara News
    </title>`;
  }, []);
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
