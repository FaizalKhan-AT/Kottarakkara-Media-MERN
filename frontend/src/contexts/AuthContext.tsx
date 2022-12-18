import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config";

interface User {
  id: string;
  username: string;
  email: string;
}
export interface contextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
}
interface Props {
  children: React.ReactNode;
}
export const Auth = createContext<contextType | null>(null);
const AuthContext: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const toLogin = () => {
    if (window.location.href.includes("/editor")) {
      navigate("/editor/login");
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/editor/login");
  };
  const checkAuth = () => {
    let token = localStorage.getItem("token");
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
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Auth.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;
