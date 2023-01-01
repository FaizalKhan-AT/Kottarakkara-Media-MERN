import React, { useEffect, useState } from "react";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import Slider from "../../Components/Slider/Slider";
import HomeSeo from "../../Components/Seo/Home";
import Title from "../../Components/Seo/Title";
const Home: React.FC = () => {
  const refreshHead = () => {
    const head = document.querySelector("head") as HTMLHeadElement;
    head.innerHTML = `<title>
      Kottarakara News | Get updated quickly with latest news and events from
      Kerala | Kottarakkara News
    </title>
     <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Kottarakara News | Get updated quickly with latest news and events from Kerala | Kottarakkara News"
      />
      <meta
        property="og:description"
        content="Get updated quickly with the latest news, specials and events from Kerala with Kottarakara News and get update with Latest Malayalam news too"
      />
      <meta property="og:url" content="https://kottarakaramedia.com/" />
      <meta property="og:site_name" content="Kottarakara Media" />
    `;
  };
  useEffect(() => {
    // refreshHead();
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
      {/* <HomeSeo /> */}
      <Title />
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
