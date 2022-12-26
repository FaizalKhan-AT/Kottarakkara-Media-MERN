import React, { useState } from "react";
const category: string[] = [
  "all editors",
  "external editors",
  "internal editors",
  "published news",
  "non published news",
];
const type: string[] = ["all", "video", "image"];
const time: string[] = ["oldest", "newest"];
export interface FilterAdmin {
  category: string;
  type: string;
  time: string;
}
interface Props {
  handleSearch: (search: string) => void;
  handleFilter: (filter: FilterAdmin) => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
const AdminFilterNav: React.FC<Props> = ({
  handleFilter,
  handleSearch,
  setTitle,
}) => {
  const [filter, setFilter] = useState<FilterAdmin>({
    category: category[0],
    type: type[0],
    time: time[0],
  });
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFilter({ ...filter, [target.name]: target.value });
    setTitle(target.name === "category" ? target.value : filter.category);
  };

  return (
    <>
      <nav className="d-flex align-items-center flex-wrap justify-content-between container gap-3">
        <div className="d-flex align-items-center gap-3">
          <select
            onChange={handleChange}
            className="form-select"
            name="category"
          >
            {category.map((item, idx) => {
              return (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          {filter.category.includes("news") ? (
            <>
              <select
                onChange={handleChange}
                className="form-select"
                name="type"
              >
                {type.map((item, idx) => {
                  return (
                    <option key={idx + item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              {!filter.type.includes("most") ? (
                <select
                  onChange={handleChange}
                  className="form-select"
                  name="time"
                >
                  {time.map((item, idx) => {
                    return (
                      <option key={idx + item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
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

export default AdminFilterNav;
