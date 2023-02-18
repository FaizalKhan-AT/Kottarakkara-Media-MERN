import React, { lazy, Suspense } from "react";
import Spinner from "../../Components/Spinner/Spinner";
const Signup = lazy(() => import("../../Components/Authentication/Signup"));

const AddNewEditor: React.FC = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <Suspense fallback={<Spinner height="50vh" />}>
        <Signup name="Add New Editor" />
      </Suspense>
    </div>
  );
};

export default AddNewEditor;
