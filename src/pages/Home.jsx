import { useEffect } from "react";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
const Home = () => {
  useEffect(()=> {
    document.title = "Home - PokeAPI";
  })
  return (
    <>
      {/* <Loading /> */}
      <Navbar />
      <main>
        <h1>Home</h1>
      </main>
    </>
  );
};

export default Home;
