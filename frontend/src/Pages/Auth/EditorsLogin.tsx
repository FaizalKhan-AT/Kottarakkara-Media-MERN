import React, { lazy, Suspense } from "react";
import Spinner from "../../Components/Spinner/Spinner";
const Login = lazy(() => import("../../Components/Authentication/Login"));

const EditorsLogin: React.FC = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <Suspense fallback={<Spinner height="50vh" />}>
        <Login name="Editors Login" />
      </Suspense>
    </div>
  );
};

export default EditorsLogin;
