import React from "react";
import "./footer.css";
import logo from "../../assets/Logo/ktr.png";
import { Link } from "react-router-dom";
import fb from "../../assets/socialMediaLogos/fb.png";
import tele from "../../assets/socialMediaLogos/tele.png";
import wap from "../../assets/socialMediaLogos/wap.png";
import insta from "../../assets/socialMediaLogos/insta.png";
import yt from "../../assets/socialMediaLogos/yts.png";
import mail from "../../assets/socialMediaLogos/mail.png";
import news from "../../assets/socialMediaLogos/news.png";
import sharechat from "../../assets/socialMediaLogos/sharechat.png";
import daily from "../../assets/socialMediaLogos/daily.png";
import motion from "../../assets/socialMediaLogos/motion.png";
import socialMedia from "../../interfaces/SocialMediaIcons";
const Footer: React.FC<{ admin?: boolean }> = ({ admin }) => {
  const icons: socialMedia[] = [
    { icon: fb, share: "https://www.facebook.com/Kottarakaramedia" },
    { icon: insta, share: "https://instagram.com/kottarakaramedia" },
    { icon: yt, share: "https://www.youtube.com/@KOTTARAKKARA" },
    { icon: tele, share: "https://t.me/kottarakaramedia" },
    { icon: wap, share: "https://chat.whatsapp.com/CPKCBSVzFOkEJu9bceAjcS" },
    { icon: mail, share: "mailto:kottarakaramedia@gmail.com" },
    {
      icon: news,
      share:
        "https://news.google.com/s/CBIwx7GegaEB?sceid=IN:en&sceid=IN:en&r=0&oc=1",
    },
    {
      icon: sharechat,
      share: "https://sharechat.com/profile/kottarakaramedia?d=n",
    },
    {
      icon: daily,
      share:
        "https://profile.dailyhunt.in/kottarakkaramedia?uu=0xba5154c275b84c03",
    },
    {
      icon: motion,
      share: "https://www.dailymotion.com/KOTTARAKKARAMEDIA",
    },
  ];
  return (
    <footer className={`bg-dark py-3 d-flex align-items-center flex-wrap`}>
      <Link to="/">
        <img width="120" src={logo} alt="kottarakkara media logo" />
      </Link>
      <div
        style={{ width: "80%" }}
        className="d-flex align-items-center  gap-3 "
      >
        <div className="d-flex flex-column align-items-center w-100">
          <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
            {icons.map((icon, idx) => {
              return (
                <a
                  key={idx}
                  href={icon.share}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={icon.icon} width="25" alt={icon.share} />
                </a>
              );
            })}
          </div>
          <div className="d-flex gap-3 flex-wrap justify-content-center w-100 my-2 mt-3">
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
