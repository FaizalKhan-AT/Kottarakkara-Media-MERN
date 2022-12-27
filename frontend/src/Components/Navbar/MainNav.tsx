import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/logo_dark.png";
import "./NavStyles.css";
interface navLinksType {
  title: string;
  route: string;
}
const navLinks: navLinksType[] = [
  {
    title: "Local News",
    route: "news/local-news",
  },
  {
    title: "News Updates",
    route: "news/news-updates",
  },
  {
    title: "Life Style",
    route: "news/life-style",
  },
  {
    title: "Travel",
    route: "news/travel",
  },
  {
    title: "Obituary",
    route: "news/obituary",
  },
  {
    title: "Tech",
    route: "news/tech",
  },
];

const MainNav: React.FC = () => {
  useEffect(() => {
    setDate(getDate());
  }, []);
  const [date, setDate] = useState<String>("");
  const getDate = () => {
    const d = new Date();
    return `${new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(d)} ${new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(d)} ${d.getDate()}, ${d.getFullYear()}`;
  };
  return (
    <nav className="navbar sticky-top  navbar-lg ">
      <div className="contaniner-fluid w-100 px-4 pe-5 py-1 d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">
          <img width="180" src={logo} alt="Kottarakara media logo" />
        </Link>

        <div
          style={{ width: "55%" }}
          className="d-flex align-items-center  justify-content-around"
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
        <div
          style={{ width: "18%" }}
          className="gap-2 d-flex align-items-center position-relative"
        >
          <input
            style={{ paddingRight: "32px" }}
            type="search"
            placeholder="Search"
            className="form-control search-inp "
          />
          <span className="btn-search position-absolute end-0 me-2 d-flex align-items-center justify-content-center">
            <span className="material-symbols-rounded search">search</span>
          </span>
        </div>
      </div>
      <div className="bg-danger position-absolute date-info text-light fw-bold px-3 py-2">
        {date ? date : ""}
      </div>
    </nav>
  );
};

export default MainNav;
