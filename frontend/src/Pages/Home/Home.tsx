import React, { useEffect, useState } from "react";
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
    setDate(getDate());
  }, []);
  const getDate = () => {
    const d = new Date();
    return `${new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(d)} ${new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(d)} ${d.getDate()}, ${d.getFullYear()}`;
  };
  const [date, setDate] = useState<string>("");
  return (
    <>
      <MainNav />
      <br />
      <div className="container fs-4 text-muted text-end">
        {date ? date : ""}
      </div>
      <br />
      <div className="d-flex container slider">
        <Slider />
      </div>
      <div className="container mt-5">
        <br />
        <CategorySection name="Latest News" />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Home;
