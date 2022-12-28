import React, { createContext, useEffect, useState } from "react";
import axios_instance from "../config";
import { News } from "../interfaces/NewsInterface";
export interface SearchType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => News[];
}
export const Search = createContext<SearchType | null>(null);
interface Props {
  children: React.ReactNode;
}
const SearchContext: React.FC<Props> = ({ children }) => {
  const fetchData = (url: string) => {
    axios_instance
      .get(url)
      .then((res) => {
        const { error, status, data } = res.data;
        switch (status) {
          case "ok":
            setTemp(data);
            break;
          case "error":
            break;
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData("/news/");
  }, []);
  const [search, setSearch] = useState<string>("");
  const [temp, setTemp] = useState<News[]>([]);
  const handleSearch = () => {
    return temp.filter((item) => {
      if (item.titleEng.includes(search.toLocaleLowerCase())) return item;
      else if (item.titleMal.includes(search.toLocaleLowerCase())) return item;
    });
  };
  return (
    <Search.Provider value={{ search, setSearch, handleSearch }}>
      {children}
    </Search.Provider>
  );
};

export default SearchContext;
