import React, { useEffect, useState } from "react";
import axios from "../../config";
interface Props {
  open: boolean;
  handleOpen: () => void;
  updateFn: (data: any) => void;
}
const UpdateLiveModal: React.FC<Props> = ({ open, handleOpen, updateFn }) => {
  const [update, setUpdate] = useState<{ url: string; _id: string }>({
    url: "",
    _id: "",
  });
  const fetchLiveUrl = () => {
    axios
      .get("/news/live")
      .then((res) => {
        const { error, data, status } = res.data;
        switch (status) {
          case "ok":
            setUpdate({ ...data, url: data.liveUrl });
            break;
          case "error":
            break;
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchLiveUrl();
  }, []);
  return (
    <>
      {" "}
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
                  settings_input_antenna
                </span>
                Update Live
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
            <input
              value={update.url}
              onChange={(e: React.FormEvent) => {
                const target = e.target as HTMLInputElement;
                setUpdate({ ...update, url: target.value });
              }}
              type="text"
              className="form-control my-2"
              placeholder={
                update.url !== "" ? update.url : "paste in the youtube url..."
              }
            />
            <br />
            <div className="d-flex align-items-center gap-3 justify-content-center">
              <div className="btn btn-secondary" onClick={handleOpen}>
                cancel
              </div>
              <div
                className="btn btn-success"
                onClick={() => {
                  updateFn(update);
                }}
              >
                update
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateLiveModal;
