import React from "react";
import "./Modals.css";
interface Props {
  open: boolean;
  handleOpen: () => void;
  deleteFn: () => void;
  data: string;
}
const DeleteModal: React.FC<Props> = ({ open, handleOpen, deleteFn, data }) => {
  return (
    <>
      <div
        style={{ zIndex: "20" }}
        className={`position-absolute modal-share ${open ? "active" : ""}`}
      >
        {" "}
        <div
          onClick={handleOpen}
          style={{ backdropFilter: "blur(3px)" }}
          className="overlay  position-fixed start-0 end-0 bottom-0 top-0"
        ></div>
        <div
          style={{ zIndex: "20", width: "40%" }}
          className="card position-fixed modal-size px-3 py-4 start-50 top-50 translate-middle"
        >
          <div>
            <div className="d-flex gap-2 h4 align-items-center justify-content-between">
              <div className="d-flex gap-2 h4 align-items-center">
                <span className="material-symbols-outlined text-dark">
                  delete
                </span>
                Delete
              </div>
              <span
                onClick={handleOpen}
                className="material-symbols-rounded fs-3"
              >
                close
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-center">Are you sure to delete ?</h4>
            <div className="text-center">{data}</div>
            <br />
            <div className="d-flex align-items-center gap-3 justify-content-center">
              <div className="btn btn-secondary" onClick={handleOpen}>
                cancel
              </div>
              <div className="btn btn-danger" onClick={deleteFn}>
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
