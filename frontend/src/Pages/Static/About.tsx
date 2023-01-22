import React from "react";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";

const About: React.FC = () => {
  return (
    <>
      <MainNav />
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        About us
      </div>
      <br />
      <div
        style={{ height: "fit-content", textTransform: "none" }}
        className="text-justify fs-5 container"
      >
        Kottarakara Media is a news website about Kottarakkara. Kottarakkara
        media is a local news channel which aims at bringing information’s at
        your fingertips. Although we are a local media we try our best to bring
        all kinds of national and international news to you at the earliest. We
        are committed in exploring the unseen parts of the world and to take you
        all there through our small venture. Besides the news, we also display
        the live visuals of the event and this makes us different from all other
        local medias. Our website also provides the provision for reporting
        local news by people.
        <div className="text-end">
          <br />
          <span>Chief Editor, </span>
          <br />
          <span className="text-danger">Vinod Alexander</span>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default About;
