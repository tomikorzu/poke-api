import { useEffect } from "react";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import Backdrop from "../components/Backdrop.jsx";
const Home = () => {
  useEffect(() => {
    document.title = "Home - PokeAPI";
  });
  return (
    <div className="fade-in">
      {/* <Loading /> */}
      {/* <Backdrop /> */}
      <Navbar />
      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
};

export default Home;
