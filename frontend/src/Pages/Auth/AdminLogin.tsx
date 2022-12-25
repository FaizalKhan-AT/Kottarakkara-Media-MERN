import React from "react";
import Login from "../../Components/Authentication/Login";

const AdminLogin: React.FC = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <Login admin name="Admin Login" />
    </div>
  );
};

export default AdminLogin;
