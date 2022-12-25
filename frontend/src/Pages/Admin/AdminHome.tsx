import React, { useEffect, useState } from "react";
import EditorCard from "../../Components/Cards/EditorCards";
import Error from "../../Components/Error/Error";
import EditorNav from "../../Components/Navbar/EditorNav";
import axios from "../../config";
import { News } from "../../interfaces/NewsInterface";
import { Editor } from "../../interfaces/userInterface";

const AdminHome: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<News[] | Editor[]>();
  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        const { error, status, data } = res.data;
        switch (status) {
          case "ok":
            setData(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => setError("something went wrong while fetching data..."));
  };
  useEffect(() => {
    fetchData("/admin/editor");
  }, []);
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <EditorNav admin />
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5"
      >
        Admin Panel
      </div>
      <br />
      <div className="container">
        <div className="d-flex gap-2 align-items-center">
          <span style={{ height: "30px", width: "4px" }} className="bar"></span>
          <span className="fw-bold text-dark h3 mb-0">all editors</span>
        </div>
        <br />
        <div className="d-flex flex-column gap-2">
          {(data?.length as number) > 0
            ? data?.map((editor) => {
                return (
                  <EditorCard key={editor._id} editor={editor as Editor} />
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
