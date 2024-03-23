import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

const onImageClick = () => {
  window.location.href = "/";
};

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleMenuClick = () => {
    setClick(!click);
  };

  const closeMenuBar = () => {
    setClick(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              className="navbar-logo-item"
              src="/images/EpicQuestsNavbarRm.png"
              onClick={onImageClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="menu-icon" onClick={handleMenuClick}>
            {click ? <MdClose /> : <MdMenu />}
          </div>
          <ul className={click ? "components active" : "components"}>
            {MenuItems.map((item, index) => {
              return (
                <Link to={item.url} className="link" key={index}>
                  <li key={index} className="component" onClick={closeMenuBar}>
                    <div className="text">
                      {item.icon}
                      {item.title}
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default React.memo(Navbar);
