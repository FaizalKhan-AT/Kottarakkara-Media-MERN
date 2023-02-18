import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../../Components/Spinner/Spinner";
const CategorySection = lazy(
  () => import("../../Components/CategorySection/CategorySection")
);
const Footer = lazy(() => import("../../Components/Footer/Footer"));
const MainNav = lazy(() => import("../../Components/Navbar/MainNav"));
const Slider = lazy(() => import("../../Components/Slider/Slider"));

const Home: React.FC = () => {
  useEffect(() => {
    setDate(getDate());
  }, []);
  const getDate = () => {
    const d = new Date();
    return `${new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(d)} ${new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(d)} ${d.getDate()}, ${d.getFullYear()}`;
  };
  const [date, setDate] = useState<string>("");
  return (
    <>
      <Suspense>
        <MainNav />
      </Suspense>
      <br />
      <div className="container fs-4 text-muted text-end">
        {date ? date : ""}
      </div>
      <br />
      <div className="d-flex container slider">
        <Suspense fallback={<Spinner />}>
          <Slider />
        </Suspense>
      </div>
      <div className="container mt-5">
        <br />
        <Suspense fallback={<Spinner height="30vh" />}>
          <CategorySection name="Latest News" />
        </Suspense>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Home;
