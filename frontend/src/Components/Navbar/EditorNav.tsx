import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo_dark.png";
import { Auth, contextType } from "../../contexts/AuthContext";
import "./NavStyles.css";

const EditorNav: FC = () => {
  const { user, handleLogout } = useContext(Auth) as contextType;
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar sticky-top  navbar-lg ">
        <div className="contaniner-fluid w-100 px-4 pe-5 py-1 d-flex align-items-center justify-content-between">
          <Link className="navbar-brand" to="/">
            <img width="180" src={logo} alt="Kottarakara media logo" />
          </Link>
          <div
            style={{ width: "80%" }}
            className="d-flex justify-content-end align-items-center"
          >
            <div className="d-flex align-items-center gap-3">
              <div>
                <div
                  title="Add new news"
                  onClick={() => navigate("/editor/post")}
                  className="btn btn-danger add-news-btn btn-rounded d-flex gap-1 align-items-center justify-content-center"
                >
                  <span className="material-symbols-outlined fs-2">
                    add_circle
                  </span>
                  <span className="add-text">Post news</span>
                </div>
              </div>
              <span className="material-symbols-outlined h1 mb-0">
                account_circle
              </span>
              <div className="d-flex flex-column">
                <span>Welcome,</span>
                <span className="fw-bold red-color">{user?.username}</span>
              </div>
              <button
                title="Logout"
                className="btn btn-primary d-flex align-items-center justify-content-center btn-rounded"
                onClick={handleLogout}
              >
                <span className=""></span>
                <span className="material-symbols-outlined ms-1">logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default EditorNav;
