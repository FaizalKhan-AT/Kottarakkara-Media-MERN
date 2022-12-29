import { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo_dark.png";
import {
  adminAuth,
  adminType,
  Auth,
  contextType,
} from "../../contexts/AuthContext";
import "./NavStyles.css";

const EditorNav: FC<{ admin?: boolean }> = ({ admin }) => {
  const { user, handleLogout } = useContext(Auth) as contextType;
  const [open, setOpen] = useState<boolean>(false);
  const { admin: adm, handleLogout: adminLogout } = useContext(
    adminAuth
  ) as adminType;
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar sticky-top  navbar-lg ">
        <div className="contaniner-fluid w-100 px-4 edit-pad pe-5 py-1 d-flex align-items-center justify-content-between">
          <Link className="navbar-brand" to="/">
            <img
              width="180"
              src={logo}
              className="logo"
              alt="Kottarakara media logo"
            />
          </Link>
          <div
            style={{ width: "80%" }}
            className="d-flex justify-content-end align-items-center position-relative"
          >
            <span
              onClick={() => setOpen(!open)}
              className="material-symbols-outlined fs-1 ham-edit"
            >
              {open ? "cancel" : "menu"}
            </span>
            <div
              className={`${
                open ? "active" : ""
              } d-flex align-items-center gap-3 edit-nav`}
            >
              <div>
                <div
                  title={admin ? "Add new editor" : "Add new news"}
                  onClick={() =>
                    navigate(admin ? "/admin/new-editor" : "/editor/post")
                  }
                  className="btn btn-danger add-news-btn btn-rounded d-flex gap-1 align-items-center justify-content-center"
                >
                  <span className="material-symbols-outlined fs-2">
                    add_circle
                  </span>
                  <span className="add-text">
                    {admin ? "Add Editor" : "Post news"}
                  </span>
                </div>
              </div>

              <span className="material-symbols-outlined h1 mb-0 acc">
                account_circle
              </span>
              <div className="d-flex flex-column user-details">
                <span>Welcome,</span>
                <span className="fw-bold red-color">
                  {admin ? adm?.username : user?.username}
                </span>
              </div>
              <div>
                <div
                  title={admin ? "Add new editor" : "Add new news"}
                  onClick={() =>
                    navigate(admin ? "/admin/new-editor" : "/editor/post")
                  }
                  className="btn btn-danger add-news-btn-mob my-2 mt-3 btn-rounded d-flex gap-1 align-items-center justify-content-center"
                >
                  <span className="material-symbols-outlined fs-2">
                    add_circle
                  </span>
                  <span>{admin ? "Add Editor" : "Post news"}</span>
                </div>
              </div>
              <button
                title="Logout"
                className="btn btn-primary logout d-flex align-items-center justify-content-center btn-rounded"
                onClick={admin ? adminLogout : handleLogout}
              >
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
