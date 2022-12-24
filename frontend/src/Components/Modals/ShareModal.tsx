import React from "react";
import "./Modals.css";
import fb from "../../assets/socialMediaLogos/fb.png";
import linkedin from "../../assets/socialMediaLogos/linkedin.png";
import reddit from "../../assets/socialMediaLogos/reddit.png";
import tele from "../../assets/socialMediaLogos/tele.png";
import wap from "../../assets/socialMediaLogos/wap.png";
import twitter from "../../assets/socialMediaLogos/twitter.png";
import mail from "../../assets/socialMediaLogos/mail.png";
import socialMedia from "../../interfaces/SocialMediaIcons";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const ShareModal: React.FC<Props> = ({ open, handleOpen }) => {
  const socialMediaShare: socialMedia[] = [
    {
      icon: fb,
      share: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
      icon: twitter,
      share:
        "https://twitter.com/intent/tweet?text=Check%20out%20this%20article:",
    },
    {
      icon: wap,
      share: "https://api.whatsapp.com/send?text=",
    },
    {
      icon: tele,
      share: "https://telegram.me/share/url?url=",
    },
    {
      icon: linkedin,
      share: "https://www.linkedin.com/shareArticle?mini=true&url=",
    },
    {
      icon: reddit,
      share: "https://reddit.com/submit?url=",
    },
    {
      icon: mail,
      share: "mailto:?subject=&BODY=",
    },
  ];
  return (
    <div
      style={{ zIndex: "20" }}
      className={`position-absolute modal-share ${open ? "active" : ""}`}
    >
      <div
        onClick={handleOpen}
        style={{ backdropFilter: "blur(3px)" }}
        className="overlay  position-fixed start-0 end-0 bottom-0 top-0"
      ></div>
      <div
        style={{ zIndex: "20", width: "40%" }}
        className="card modal-size position-fixed px-3 py-4 start-50 top-50 translate-middle"
      >
        <div>
          <div className="d-flex gap-2 h4 align-items-center justify-content-between">
            <div className="d-flex gap-2 h4 align-items-center">
              <span className="material-symbols-outlined text-dark">share</span>
              Share
            </div>
            <span
              onClick={handleOpen}
              className="material-symbols-rounded fs-3"
            >
              close
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
            <div
              title="copy url"
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              className="btn btn-dark d-flex flex-column align-items-center"
            >
              <span className="fs-2 material-symbols-outlined">
                content_copy
              </span>
            </div>
            {socialMediaShare.map((item, idx) => {
              return (
                <a target="_blank" key={idx + "share"} href={item.share}>
                  <img src={item.icon} width="50" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
