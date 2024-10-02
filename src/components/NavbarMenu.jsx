import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/navbar-btn.css";

const NavbarMenu = ({ items }) => {
  const navigate = useNavigate();

  const handleLinkButton = (url) => {
    document.querySelector('body').classList.add("fade-out");
    setTimeout(() => {
      navigate(url);
      document.querySelector('body').classList.remove("fade-out");
    }, 500);
  };

  useEffect(() => {
    const toggleBtn = document.querySelector(".toggle-btn");
    const handleToggle = () => {
      toggleBtn.classList.toggle("active");
      const navbar = document.querySelector(".navbar");
      navbar.classList.toggle("clip");
      const navbarMenu = document.querySelector(".navbar-menu");
      navbarMenu.classList.toggle("fade-in-menu");
    };

    toggleBtn.addEventListener("click", handleToggle);

    return () => {
      toggleBtn.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <>
      <button className="toggle-btn">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </button>
      <nav className="navbar">
        <ul className="navbar-menu">
          {items.map((item, index) => (
            <li key={index} className="navbar-item">
              <div className="button-container">
                <button
                  className="navbar-link"
                  onClick={() => handleLinkButton(item.url)}
                >
                  {item.item}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavbarMenu;
