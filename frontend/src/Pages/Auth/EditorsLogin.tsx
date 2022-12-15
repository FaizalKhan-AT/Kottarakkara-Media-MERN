import React from "react";
import Login from "../../Components/Authentication/Login";

const EditorsLogin: React.FC = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <Login name="Editors Login" />
    </div>
  );
};

export default EditorsLogin;
