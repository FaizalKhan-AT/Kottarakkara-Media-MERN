import React, { useState } from "react";
import axios from "../../config";
import { Editor } from "../../interfaces/userInterface";
import Error from "../Error/Error";
import DeleteModal from "../Modals/DeleteModal";
import Success from "../Success/Success";
import "./card.css";
interface Props {
  editor: Editor;
  fetchFn: (url: string) => void;
}
const EditorCards: React.FC<Props> = ({ editor, fetchFn }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const handleOpenModal = () => setOpenModal(!openModal);
  const deleteEditor = () => {
    axios
      .delete(`/admin/editor/${editor._id}`)
      .then((res) => {
        const { error, status, data } = res.data;
        switch (status) {
          case "ok":
            setSuccess(data);
            handleOpenModal();
            fetchFn("/admin/editor");
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("something went wrong while fetching data..."));
  };
  return (
    <>
      <DeleteModal
        open={openModal}
        handleOpen={handleOpenModal}
        deleteFn={deleteEditor}
        data={editor.username}
      />
      {error ? <Error error={error} setError={setError} /> : ""}
      {success ? <Success success={success} setSuccess={setSuccess} /> : ""}
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
                {expand ? "less" : "more"}
              </div>
            </div>
          </div>
        </div>
        {expand ? (
          <div className="card expand py-2 px-3 mt-1">
            <div className="d-flex flex-column gap-2">
              <span className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5">Email : </span>
                <span className="fw-bold red-color text-lowercase">
                  {editor.email}{" "}
                </span>
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
              <div
                onClick={handleOpenModal}
                className="btn btn-outline-danger btn-rounded"
              >
                Delete
              </div>
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
