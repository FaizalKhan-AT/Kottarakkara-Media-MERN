import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config";
import { Admin } from "../interfaces/userInterface";

interface User {
  _id: string;
  username: string;
  email: string;
}
export interface contextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
  checkAuth: () => void;
}
export interface adminType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  checkAdmin: () => void;
  handleLogout: () => void;
}
interface Props {
  children: React.ReactNode;
}
export const Auth = createContext<contextType | null>(null);
export const adminAuth = createContext<adminType | null>(null);
const AuthContext: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const navigate = useNavigate();
  const toLogin = () => {
    if (window.location.href.includes("/editor")) {
      navigate("/editor/login");
    }
  };
  const toAdminLogin = () => {
    if (window.location.href.includes("/admin")) {
      navigate("/admin/login");
    }
  };
  const isAdmin = () => {
    if (window.location.href.includes("/admin")) return true;
    else return false;
  };
  const handleLogout = () => {
    if (isAdmin()) {
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("etoken");
      navigate("/editor/login");
    }
  };
  const checkAuth = () => {
    let token = localStorage.getItem("etoken");
    if (!token) {
      setUser(null);
      toLogin();
      return;
    }
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            toLogin();
            return;
          case "ok":
            setUser(data);
            break;
        }
      })
      .catch((err) => {
        navigate("/editor/login");
      });
  };

  const checkAdmin = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      setAdmin(null);
      toAdminLogin();
      return;
    }
    axios
      .get("/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            toAdminLogin();
            return;
          case "ok":
            setAdmin(data);
            break;
        }
      })
      .catch((err) => {
        navigate("/admin/login");
      });
  };
  useEffect(() => {
    if (isAdmin()) checkAdmin();
    else checkAuth();
  }, []);

  return (
    <adminAuth.Provider value={{ admin, setAdmin, checkAdmin, handleLogout }}>
      <Auth.Provider value={{ user, setUser, handleLogout, checkAuth }}>
        {children}
      </Auth.Provider>
    </adminAuth.Provider>
  );
};

export default AuthContext;
