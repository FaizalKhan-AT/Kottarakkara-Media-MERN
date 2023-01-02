import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContext from "./contexts/AuthContext";
import PostContext from "./contexts/PostContext";
import SearchContext from "./contexts/SearchContext";

import "./index.css";
export const APP = (
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

// for ssr
ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, APP);

// for react-snap
// import { hydrate, render } from "react-dom";
// const root = document.getElementById("root") as HTMLElement;

// if (root.hasChildNodes()) {
//   hydrate(APP, root);
// } else {
//   render(APP, root);
// }
// normal
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
