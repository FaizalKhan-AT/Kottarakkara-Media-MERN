import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContext from "./contexts/AuthContext";
import PostContext from "./contexts/PostContext";
import SearchContext from "./contexts/SearchContext";

import { hydrate, render } from "react-dom";
import "./index.css";
const root = document.getElementById("root") as HTMLElement;
const APP = (
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
if (root.hasChildNodes()) {
  hydrate(APP, root);
} else {
  render(APP, root);
}
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthContext>
//         <PostContext>
//           <SearchContext>
//             <App />
//           </SearchContext>
//         </PostContext>
//       </AuthContext>
//     </BrowserRouter>
//   </React.StrictMode>
// );
// serviceWorkerRegistration.register();
