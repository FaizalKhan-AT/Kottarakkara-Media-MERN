import React, { useEffect, useState } from "react";
import axios from "../../config";
import "./sidebar.css";
const categories: string[] = [
  "all",
  "local news",
  "news updates",
  "life style",
  "travel",
  "obituary",
  "tech",
  "entertainment",
  "sports",
];
const time: string[] = ["newest", "oldest"];
const type: string[] = ["all", "image", "video"];
interface Props {
  handleOpen: () => void;
  open: boolean;
  handleFilter: (filter: NFilter) => void;
}
export interface NFilter {
  place: string;
  time: string;
  category: string;
  type: string;
}
const FilterSidebar: React.FC<Props> = ({ open, handleOpen, handleFilter }) => {
  const [places, setPlaces] = useState<string[]>([]);
  const [filter, setFilter] = useState<NFilter>({
    place: "",
    time: "newest",
    category: "all",
    type: "all",
  });
  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        const { error, data, status } = res.data;
        switch (status) {
          case "ok":
            setPlaces(data);
            break;
          case "error":
            break;
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData("/news/places");
  }, []);
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFilter({ ...filter, [target.name]: target.value });
  };
  return (
    <>
      <div className="position-realtive">
        <div
          style={{ zIndex: "20" }}
          className={`position-fixed bg-light bottom-0 sidebar ${
            open ? "active" : ""
          }`}
        >
          <div className="position-relative">
            <div
              style={{ textDecoration: "dotted underline var(--red-color)" }}
              className="justify-content-center my-2 d-flex align-items-center"
            >
              <span className="fs-4 fw-bold">Filter news</span>
            </div>
            <div
              onClick={handleOpen}
              className="btn btn-close position-absolute end-0 top-0 me-3 mt-1"
            ></div>
          </div>
          <br />
          <div className="d-flex flex-column gap-2 mx-3">
            <span className="fw-bold">All categories</span>
            <select
              className="form-select"
              name="category"
              onChange={handleChange}
            >
              {categories.map((cat, idx) => {
                return (
                  <option value={cat} key={cat + idx}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <br />
          <div className="d-flex flex-column gap-2 mx-3">
            <span className="fw-bold">by type</span>
            <select className="form-select" name="type" onChange={handleChange}>
              {type.map((cat, idx) => {
                return (
                  <option value={cat} key={cat + idx}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <br />
          <div className="d-flex flex-column gap-2 mx-3">
            <span className="fw-bold">By time</span>
            <select className="form-select" name="time" onChange={handleChange}>
              {time.map((cat, idx) => {
                return (
                  <option value={cat} key={cat + idx}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <br />
          <div className="d-flex flex-column gap-2 mx-3">
            <span className="fw-bold">By place</span>
            {places.length > 0 ? (
              <select
                className="form-select"
                name="place"
                onChange={handleChange}
              >
                <option></option>
                {places.map((cat, idx) => {
                  return (
                    <option value={cat} key={cat + idx}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            ) : (
              " "
            )}
          </div>
          <br />
          <div className="d-flex align-items-center justify-content-center">
            <div
              onClick={() => handleFilter(filter)}
              className="btn btn-outline-dark btn-rounded "
            >
              Apply filters
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
