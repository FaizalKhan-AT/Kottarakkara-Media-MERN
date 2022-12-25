import React, { useState } from "react";
import { Editor } from "../../interfaces/userInterface";
import "./card.css";
const EditorCards: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <div>
        <div className="card py-2 px-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined h3 mb-0">
                account_circle
              </span>
              <span className="h5 mb-0">{editor.username}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                className="btn btn-outline-dark btn-rounded"
                onClick={() => setExpand(!expand)}
              >
                more
              </div>
            </div>
          </div>
        </div>
        {expand ? (
          <div className="card expand py-2 px-3 mt-1">
            <div className="d-flex flex-column gap-2">
              <span className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5">Email : </span>
                <span className="fw-bold red-color">{editor.email} </span>
              </span>
              <span className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5">External : </span>
                <span className="fw-bold red-color">
                  {editor.external ? "Yes" : "No"}
                </span>
              </span>
              <span className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5">Password : </span>
                <input
                  className={`fw-bold ${
                    showPassword ? "red-color" : "text-dark"
                  } edit-pass`}
                  value={editor.pass}
                  type={showPassword ? "text" : "password"}
                  readOnly
                />
              </span>
              <label
                style={{ userSelect: "none" }}
                className="d-flex align-items-center gap-2"
              >
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span>show Password</span>
              </label>
            </div>
            <div className="d-flex align-items-center gap-3 justify-content-center mb-2">
              <div className="btn btn-outline-danger btn-rounded">Delete</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EditorCards;
