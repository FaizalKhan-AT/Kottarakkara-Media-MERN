import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo_dark.png";
import "./NavStyles.css";
interface navLinksType {
  title: string;
  route: string;
}
const navLinks: navLinksType[] = [
  {
    title: "all News",
    route: "/news/all",
  },
  {
    title: "Local News",
    route: "/news/local-news",
  },
  {
    title: "National news",
    route: "/news/all",
  },
  {
    title: "international News",
    route: "/news/all",
  },
  {
    title: "News Updates",
    route: "/news/news-updates",
  },
  {
    title: "Life Style",
    route: "/news/life-style",
  },
  {
    title: "Travel",
    route: "/news/travel",
  },
  {
    title: "Obituary",
    route: "/news/obituary",
  },
  {
    title: "Tech",
    route: "/news/tech",
  },
];
interface Props {
  news?: boolean;
  handleOpen?: () => void;
}
const MainNav: React.FC<Props> = ({ news, handleOpen }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="navbar sticky-top  navbar-lg ">
      <div className="contaniner-fluid nav-main position-relative w-100 px-4 pe-5 py-1 d-flex align-items-center justify-content-between">
        <Link className="navbar-brand " to="/">
          <picture>
            <img
              width="180"
              className="logo"
              src={logo}
              alt="Kottarakara media logo"
            />
          </picture>
        </Link>
        <span className="d-flex align-items-center gap-3 w-100 justify-content-end">
          {!news ? (
            <>
              <div
                style={{ width: "55%" }}
                className={`${
                  open ? "active" : ""
                } d-flex nav-items align-items-center justify-content-around`}
              >
                {navLinks.map(({ title, route }, idx) => {
                  return (
                    <Link className="nav-link" to={route} key={idx + title}>
                      {title}
                    </Link>
                  );
                })}
                <Link className="nav-link" to="/live">
                  Live
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="d-flex align-items-center gap-3 justify-content-end">
            <div className="gap-2 search-bar d-flex align-items-center position-relative">
              {!news ? (
                <span
                  onClick={() => {
                    navigate(`/news/all/`);
                  }}
                  className="btn-search position-absolute  end-0 me-2 d-flex align-items-center justify-content-center"
                >
                  <span className="material-symbols-rounded fs-2 search">
                    search
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>

            {news ? (
              <div>
                <span
                  onClick={handleOpen}
                  className="me-2 btn btn-danger btn-rounded d-flex align-items-center justify-content-center"
                >
                  <span className="fs-3 fw-light material-symbols-rounded search">
                    filter_alt
                  </span>
                  <span>filter</span>
                </span>
              </div>
            ) : (
              <span
                title="categories"
                onClick={() => setOpen(!open)}
                className="material-symbols-outlined pointer fs-1 ham-btn"
              >
                {open ? "cancel" : "apps"}
              </span>
            )}
          </div>
        </span>
      </div>
    </nav>
  );
};

export default MainNav;
