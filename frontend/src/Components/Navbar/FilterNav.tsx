import { stringify } from "querystring";
import React, { useState } from "react";
import { Filter } from "../../Pages/EditorPages/EditorHome";
const type: string[] = ["All", "image", "video"];
const time: string[] = ["Oldest", "Newest"];
const most: string[] = ["most viewed", "most liked"];
interface Props {
  handleSearch: (search: string) => void;
  handleFilter: (filter: Filter) => void;
}
const FilterNav: React.FC<Props> = ({ handleSearch, handleFilter }) => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<{
    type: string;
    time: string;
  }>({
    type: "All",
    time: "Oldest",
  });
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    setFilter({ ...filter, [target.name]: target.value });
  };
  return (
    <>
      <nav className="d-flex align-items-center flex-wrap justify-content-between container gap-3">
        <div className="d-flex align-items-center gap-3">
          <select onChange={handleChange} className="form-select" name="type">
            {type.map((item, idx) => {
              return (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select onChange={handleChange} className="form-select" name="time">
            {time.map((item, idx) => {
              return (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          {/* <select onChange={handleChange} className="form-select" name="most">
            {most.map((item, idx) => {
              return (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select> */}
          <div
            onClick={() => handleFilter(filter)}
            className="btn btn-dark btn-rounded d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined">filter_alt</span>
            <span>Filter</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e: React.FormEvent) => {
              const target = e.target as HTMLInputElement;
              setSearch(target.value);
            }}
            className="form-control"
          />
          <span
            onClick={() => handleSearch(search)}
            className="btn btn-rounded btn-dark d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-rounded search">search</span>
          </span>
        </div>
      </nav>
    </>
  );
};

export default FilterNav;
