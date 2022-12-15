import React from "react";
import Signup from "../../Components/Authentication/Signup";

const AddNewEditor: React.FC = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex align-items-center justify-content-center"
    >
      <Signup name="Add New Editor" />
    </div>
  );
};

export default AddNewEditor;
