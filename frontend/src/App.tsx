import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ReactGa from "react-ga4";
import { TRACKING_ID } from "./env";
import Spinner from "./Components/Spinner/Spinner";
ReactGa.initialize(TRACKING_ID);
const Home = lazy(() => import("./Pages/Home/Home"));
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome"));
const AddNewEditor = lazy(() => import("./Pages/Auth/AddNewEditor"));
const AdminLogin = lazy(() => import("./Pages/Auth/AdminLogin"));
const EditorsLogin = lazy(() => import("./Pages/Auth/EditorsLogin"));
const EditorsSignup = lazy(() => import("./Pages/Auth/EditorsSignup"));
const AddNews = lazy(() => import("./Pages/EditorPages/AddNew"));
const EditNews = lazy(() => import("./Pages/EditorPages/EditNews"));
const EditorHome = lazy(() => import("./Pages/EditorPages/EditorHome"));
const NewsFilter = lazy(() => import("./Pages/News/NewsFilter"));
const Live = lazy(() => import("./Pages/Post/Live"));
const Post = lazy(() => import("./Pages/Post/Post"));
const About = lazy(() => import("./Pages/Static/About"));
const Contact = lazy(() => import("./Pages/Static/Contact"));
const Grievance = lazy(() => import("./Pages/Static/Grievance"));

const App: React.FC = () => {
  useEffect(() => {
    ReactGa.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner height="50vh" />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/live"
          element={
            <Suspense fallback={<Spinner height="50vh" />}>
              <Live />
            </Suspense>
          }
        />
        <Route
          path="/:category/:slug/:id"
          element={
            <Suspense fallback={<Spinner height="50vh" />}>
              <Post />
            </Suspense>
          }
        />
        <Route
          path="/about-us"
          element={
            <Suspense fallback={<Spinner height="50vh" />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/grievance"
          element={
            <Suspense fallback={<Spinner height="50vh" />}>
              <Grievance />
            </Suspense>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Suspense fallback={<Spinner height="50vh" />}>
              <Contact />
            </Suspense>
          }
        />
        <Route path="/news/:category">
          <Route
            index
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <NewsFilter />
              </Suspense>
            }
          />
          <Route
            path=":key"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <NewsFilter />
              </Suspense>
            }
          />
        </Route>
        <Route path="/admin">
          <Route
            index
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <AdminHome />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="new-editor"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <AddNewEditor />
              </Suspense>
            }
          />
        </Route>
        <Route path="/editor">
          <Route
            index
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <EditorHome />
              </Suspense>
            }
          />
          <Route
            path="join-us"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <EditorsSignup />
              </Suspense>
            }
          />
          <Route
            path="post"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <AddNews />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <EditorsLogin />
              </Suspense>
            }
          />
          <Route
            path="edit"
            element={
              <Suspense fallback={<Spinner height="50vh" />}>
                <EditNews />
              </Suspense>
            }
          />
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
