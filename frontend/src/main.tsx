import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContext from "./contexts/AuthContext";
import PostContext from "./contexts/PostContext";
import SearchContext from "./contexts/SearchContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <PostContext>
          <SearchContext>
            <App />
          </SearchContext>
        </PostContext>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
