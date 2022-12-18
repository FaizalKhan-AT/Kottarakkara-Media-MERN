import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import AddNewEditor from "./Pages/Auth/AddNewEditor";
import EditorsLogin from "./Pages/Auth/EditorsLogin";
import EditorHome from "./Pages/EditorPages/EditorHome";
import Home from "./Pages/Home/Home";
import Post from "./Pages/Post/Post";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/:vid" element={<Post />} />
        <Route path="/super-admin">
          <Route index element={<h1>Super admin panel</h1>} />
          <Route path="add-new-editor" element={<AddNewEditor />} />
        </Route>
        <Route path="/editor">
          <Route index element={<EditorHome />} />
          <Route path="login" element={<EditorsLogin />} />
        </Route>
        <Route
          path="*"
          element={
            <h1 className="text-center mt-5">
              404 Page not found. Requested page Doesn't Exist{" "}
              <Link to="/">Home</Link>
            </h1>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
