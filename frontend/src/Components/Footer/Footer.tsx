import React from "react";
import "./footer.css";
import logo from "../../assets/Logo/ktr.png";
import { Link } from "react-router-dom";
import fb from "../../assets/socialMediaLogos/fb.png";
import linkedin from "../../assets/socialMediaLogos/linkedin.png";
import reddit from "../../assets/socialMediaLogos/reddit.png";
import tele from "../../assets/socialMediaLogos/tele.png";
import wap from "../../assets/socialMediaLogos/wap.png";
import twitter from "../../assets/socialMediaLogos/twitter.png";
import mail from "../../assets/socialMediaLogos/mail.png";
import socialMedia from "../../interfaces/SocialMediaIcons";
const Footer: React.FC<{ admin?: boolean }> = ({ admin }) => {
  const icons: socialMedia[] = [
    { icon: fb, share: "" },
    { icon: tele, share: "" },
    { icon: wap, share: "" },
    { icon: twitter, share: "" },
    { icon: reddit, share: "" },
    { icon: mail, share: "" },
  ];
  return (
    <footer className={`bg-dark py-3 d-flex align-items-center`}>
      <Link to="/">
        <img width="120" src={logo} alt="kottarakkara media logo" />
      </Link>
      <div
        style={{ width: "80%" }}
        className="d-flex align-items-center  gap-3 "
      >
        <div className="d-flex flex-column align-items-center w-100">
          <div className="d-flex align-items-center gap-3">
            {icons.map((icon, idx) => {
              return (
                <a
                  key={idx}
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={icon.icon} width="25" alt={icon.share} />
                </a>
              );
            })}
          </div>
          <div className="d-flex gap-3 justify-content-center w-100 my-2 mt-3">
            <Link className="footer-links fs-6" to="/about-us">
              About us
            </Link>
            <Link className="footer-links fs-6" to="/contact-us">
              Contact us
            </Link>
            <Link className="footer-links fs-6" to="/grievance">
              Grievance
            </Link>
            <Link className="footer-links fs-6" to="/editor/join-us">
              Join us
            </Link>
          </div>
          <div className="d-flex gap-1 flex-column text-center text-light mt-2">
            Kottarakkara Media. All rights reserved &copy; 2023
            <br />
            <span className="">
              Developed by{" "}
              <a
                className="dev-link"
                href="https://faizalkhan-at.github.io/animated-porfolio-angular/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @al techie
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
