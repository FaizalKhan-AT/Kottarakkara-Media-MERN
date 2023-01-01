import React from "react";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import Title from "../../Components/Seo/Title";

const Contact: React.FC = () => {
  return (
    <>
      <Title />

      <MainNav />
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        contact us
      </div>
      <div
        style={{ fontSize: "20px", height: "fit-content" }}
        className="container fw-bold d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          Mr.Vinod Alexander,
          <br />
          Chief Editor Vsquare TV, <br /> Phone:{" "}
          <a target="_blank" href="tel:9961454976" className="text-danger">
            9961454976
          </a>
          ,<br /> Whatsapp:{" "}
          <a
            target="_blank"
            href="https://wa.me/+919961454976"
            className="text-danger"
          >
            9961454976
          </a>
          ,
          <br /> Email:{" "}
          <a
            target="_blank"
            href="mailto:Kottarakaramedia"
            className="text-danger text-lowercase"
          >
            Kottarakaramedia@gmail.com
          </a>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Contact;
