import "./styles/navbar.css";
import pokeImg from "../assets/img/poke-img.png";

const Navbar = () => {
  return (
    <header className="header">
      <div className="navbar ">
        <img src={pokeImg} alt="" className="logo-img" />
        <nav className="btn-container back-next">
          <button className="back-next-btn" id="back-page">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3 className="div-center current-page-h3">{window.location.pathname }</h3>
          <button className="back-next-btn" id="next-page">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </nav>
      </div>
      <div className="div-center input-search-div">
        <input
          type="search"
          name=""
          id="input-search"
          className="input-search"
          placeholder="Search a pokemon..."
        />
      </div>
    </header>
  );
};
export default Navbar;
