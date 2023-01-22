import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminHome from "./Pages/Admin/AdminHome";
import AddNewEditor from "./Pages/Auth/AddNewEditor";
import AdminLogin from "./Pages/Auth/AdminLogin";
import EditorsLogin from "./Pages/Auth/EditorsLogin";
import EditorsSignup from "./Pages/Auth/EditorsSignup";
import AddNews from "./Pages/EditorPages/AddNew";
import EditNews from "./Pages/EditorPages/EditNews";
import EditorHome from "./Pages/EditorPages/EditorHome";
import Home from "./Pages/Home/Home";
import NewsFilter from "./Pages/News/NewsFilter";
import Live from "./Pages/Post/Live";
import Post from "./Pages/Post/Post";
import About from "./Pages/Static/About";
import Contact from "./Pages/Static/Contact";
import Grievance from "./Pages/Static/Grievance";
import ReactGa from "react-ga4";
import { TRACKING_ID } from "./env";
ReactGa.initialize(TRACKING_ID);
const App: React.FC = () => {
  useEffect(() => {
    ReactGa.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/:category/:slug/:id" element={<Post />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/grievance" element={<Grievance />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/news/:category">
          <Route index element={<NewsFilter />} />
          <Route path=":key" element={<NewsFilter />} />
        </Route>
        <Route path="/admin">
          <Route index element={<AdminHome />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="new-editor" element={<AddNewEditor />} />
        </Route>
        <Route path="/editor">
          <Route index element={<EditorHome />} />
          <Route path="join-us" element={<EditorsSignup />} />
          <Route path="post" element={<AddNews />} />
          <Route path="login" element={<EditorsLogin />} />
          <Route path="edit" element={<EditNews />} />
        </Route>
        <Route
          path="*"
          element={
            <h2 className="text-center mt-5">
              404 Page not found. Requested page Doesn't Exist{" "}
              <Link to="/">Home</Link>
            </h2>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
